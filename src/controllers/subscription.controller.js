import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
    
    // Find the channel (user) being subscribed to
    const channelUser = await User.findById(channelId);
    
    if (!channelUser) {
        throw new ApiError(404, "Channel not found");
    }
    
    // Check if user is trying to subscribe to themselves
    if (channelUser._id.toString() === req.user._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel");
    }
    
    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    });
    
    // Toggle subscription (delete if exists, create if not)
    let message;
    if (existingSubscription) {
        // Unsubscribe
        await Subscription.findByIdAndDelete(existingSubscription._id);
        message = "Unsubscribed successfully";
    } else {
        // Subscribe
        await Subscription.create({
            subscriber: req.user._id,
            channel: channelId
        });
        message = "Subscribed successfully";
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            message
        ));
});

// Controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
    
    // Find subscribers for the channel
    const subscribers = await Subscription.find({ channel: channelId })
        .populate("subscriber", "username email fullName avatar");
    
    if (!subscribers || subscribers.length === 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No subscribers found for this channel"
            )
        );
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            subscribers,
            "Channel subscribers found successfully"
        ));
});

// Controller to return channels subscribed by a user
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID");
    }
    
    // Find user
    const user = await User.findById(subscriberId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    // Find channels subscribed by the user
    const subscribedChannels = await Subscription.find({ subscriber: subscriberId })
        .populate("channel", "username email fullName avatar");
    
    if (!subscribedChannels || subscribedChannels.length === 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "User is not subscribed to any channels"
            )
        );
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            subscribedChannels,
            "Subscribed channels found successfully"
        ));
});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
};