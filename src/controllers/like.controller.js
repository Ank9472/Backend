import mongoose  from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import {Apiresponse} from "../utils/asyncHandler.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { request } from "http";

const toggleVideoLike = asyncHandler(async (req , res)  => 
  {
   const {videoId} = req.params
   //TODO: toggle like on video
  // More commonly, using $addToSet if not in array, $pull if in array
const doc = await collection.findOne({ _id: videoId });
const isInArray = doc.likes.includes(userId);

if (isInArray) {
  await collection.updateOne(
    { _id: videoId },
    { $pull: { likes: userId } }
  );
} else {
  await collection.updateOne(
    { _id: videoId },
    { $addToSet: { likes: userId } }
  );
}
   }
      
   )
const toggleCommentLike = asyncHandler(async(req,res) =>
  {    
    const {commentId} = req.params
//TODO: toggle like on comment
if (isInArray) {
  await collection.updateOne(
    { _id: commentId },
    { $pull: { likes: userId } }
  );
} else {
  await collection.updateOne(
    { _id: commentId },
    { $addToSet: { likes: userId } }
  );
}

})

const toggleTweetLike = asyncHandler(async (req,res)=> {
     const {tweetId} = req.params
     if (isInArray) {
      await collection.updateOne(
        { _id: tweetId },
        { $pull: { likes: userId } }
      );
    } else {
      await collection.updateOne(
        { _id: tweetId },
        { $addToSet: { likes: userId } }
      );
    }
})

const getLikedVideos = asyncHandler(async (req,res) =>
{
     //TODO: get all liked videos
     const{Like} = request.params; 

     if (isInArray) {
      await collection.updateOne(
        { _id: Like },
        { $pull: { likes: userId } }
      );
    } else {
      await collection.updateOne(
        { _id: Like },
        { $addToSet: { likes: userId } }
      );
    }
})


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}