import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse, asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    
    // Create filter object
    const filter = {};
    
    // Add search query if provided
    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ];
    }
    
    // Add user filter if provided
    if (userId) {
        filter.owner = userId;
    }
    
    // Create sort object
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortType === "desc" ? -1 : 1;
    } else {
        sort.createdAt = -1; // Default sort by creation date descending
    }
    
    const videos = await Video.find(filter)
        .populate("owner", "username fullName avatar")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .sort(sort);
    
    const totalVideos = await Video.countDocuments(filter);
    
    if (!videos.length) {
        throw new ApiError(404, "No videos found");
    }
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, "All videos fetched successfully", {
                videos,
                totalVideos,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalVideos / parseInt(limit))
            })
        );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    // Validation
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }
    
    // Check if video file exists
    if (!req.files || !req.files.videoFile) {
        throw new ApiError(400, "Video file is required");
    }
    
    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
    
    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }
    
    // Upload video to cloudinary
    const videoFile = await uploadOnCloudinary(videoLocalPath);
    
    if (!videoFile) {
        throw new ApiError(500, "Error while uploading video");
    }
    
        // Upload thumbnail if provided
        let thumbnail;
        if (thumbnailLocalPath) {
            thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
            if (!thumbnail) {
                throw new ApiError(500, "Error while uploading thumbnail");
            }
        }
    
        const video = await Video.create({
            title,
            description,
            videoFile: videoFile.url,
            thumbnail: thumbnail?.url || "",
            duration: videoFile.duration,
            owner: req.user._id
        });
    
        return res
            .status(201)
            .json(new ApiResponse(201, "Video uploaded successfully", video));
    });
    
    const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    
    const video = await Video.findById(videoId).populate("owner", "username fullName avatar");
    
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, "Video fetched successfully", video));
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    
    if (!title && !description && !req.files?.thumbnail) {
        throw new ApiError(400, "At least one field is required to update");
    }
    
    // Find the video
    const video = await Video.findById(videoId);
    
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    
    // Check ownership
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }
    
    // Update fields if provided
    if (title) video.title = title;
    if (description) video.description = description;
    
    // Handle thumbnail update if provided
    if (req.files && req.files.thumbnail) {
        const thumbnailLocalPath = req.files.thumbnail[0].path;
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        
        if (!thumbnail) {
            throw new ApiError(500, "Error while uploading thumbnail");
        }
        
        video.thumbnail = thumbnail.url;
    }
    
    await video.save();
    
    const updatedVideo = await Video.findById(videoId).populate("owner", "username fullName avatar");
    
    return res
        .status(200)
        .json(new ApiResponse(200, "Video updated successfully", updatedVideo));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    
    const video = await Video.findById(videoId);
    
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video");
    }
    
    await Video.findByIdAndDelete(videoId);
    
    return res
        .status(200)
        .json(new ApiResponse(200, "Video deleted successfully", {}));
});
 

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }
    
    video.isPublished = !video.isPublished;
    await video.save();
    
    return res
        .status(200)
        .json(new ApiResponse(
            200, 
            `Video ${video.isPublished ? "published" : "unpublished"} successfully`, 
            video
        ));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
