import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }
    const tweet = await Tweet.create({
        owner: req.user._id, // Assuming user info is attached to req by middleware
        content: content 
    });
     
    if (!tweet) {
        throw new ApiError(500, "Failed to create tweet");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            tweet,
            "Tweet created successfully"
        )
    );
});
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    
    const tweets = await Tweet.find({ owner: userId });
    
    if (!tweets || tweets.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "No tweets found for this user"
            )
        );
    }
   
    return res.status(200).json(
        new ApiResponse(
            200,
            tweets,
            "User tweets retrieved successfully"
        )
    );
});
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;
      
    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }
    
    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required for update");
    }
    
    const tweet = await Tweet.findById(tweetId);
    
    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }
    
    // Check if the user owns the tweet
    if (tweet.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet");
    }
   
    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { content },
        { new: true }
    );
    if (!updatedTweet) {
        throw new ApiError(500, "Failed to update tweet");
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTweet,
            "Tweet updated successfully"
        )
    );
});
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }
    
    const tweet = await Tweet.findById(tweetId);
    
    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }
    
    if (tweet.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet");
    }
    
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
    
    if (!deletedTweet) {
        throw new ApiError(500, "Failed to delete tweet");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Tweet deleted successfully"
        )
    );
});
export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
};