import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId || req.user._id;

    if (!channelId) {
        throw new ApiError(400, "Channel ID is required");
    }

    const videos = await Video.find({ owner: channelId });

    const totalVideos = await Video.countDocuments({ owner: channelId });
    const videoIds = videos.map(video => video._id);

    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });

    const videosWithViews = await Video.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(channelId) } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);

    const totalViews = videosWithViews[0]?.totalViews || 0;
    const totalSubscribers = await Subscription.countDocuments({ channel: channelId });

    return res
        .status(200)
        .json(new ApiResponse(200, {
            totalVideos,
            totalLikes,
            totalViews,
            totalSubscribers
        }, "Channel stats retrieved successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    try {
        const { channelId } = req.params;
        const videos = await Video.find({ channelId });
        res.status(200).json(new ApiResponse(200, videos, "Channel videos retrieved successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to get channel videos", error);
    }
});

export {
    getChannelStats,
    getChannelVideos
};