import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler"
import { request } from "http";

const createTweet = asyncHandler(async (req,res) => {
    //TODO: create tweet
    const {content} = req.body; 
    
    const tweet = await Tweet.create({
        owner:req.User_id,
        content: content 
    }) 
     
    if(!tweet){
        throw new ApiError(500, "Failed to create tweet")
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            tweet,
            "tweet create sucessfully"
        )
    )
})

const getUserTweets = asyncHandler(async (req,res)  => {
    //TODO: get user tweets
  
    const {User_id} = req.params
    if(!User_id){
        throw new ApiError(400,"User_id is required")
    }
    
    const tweets = await UserTweets.find({owner:User_id})
    
    if(!tweets || tweets.length ===0){
         return res.status(400).json(
            new ApiResponse(
                404,
                null,
                "No tweets found for this"
            )
         )
    }
   
     return res.status(201).json(
        new ApiResponse(
            200,
            tweets,
            "User Tweets retrived  sucessfully"
        )
     )
})

const updateTweet = asyncHandler(async (req,res) => {
        //TODO: update tweet
      const{User_id} = req.params;
      
    if(!User_id){
       throw newApiError(400,"User_id is reqired")  
    }
   
    const Tweetupdate = await findbyIdAndUpdate(User_id)
    if(!Tweetupdate){
        throw new ApiError(500,"Failed to Update tweet")
    }
    
    return res.status(201).json(
        new ApiResponse(
           201,
           "Tweet update Sucess fully"
        )
    )
})

const deleteTweet = asyncHandler(async (req , res) => {
         //TODO: delete tweet
     const {User_id} = request.params;

    if(!User_id) {
    throw newApiError(400,"user_id is required")
    }
    
    const tweetdelete = await tweetdelete.findbyIdAndUpdate(User_id)
    
    if(!tweetdelete)
     {      throw newApiError(404, "tweet already delete")
     }
    
     if(tweetdelete.owner.toString()!== req.User_id.toString()){
        throw new ApiError(403,"you don't delete this tweet")
     })
    
     await deleteTweet.findbyIdAndDelete(User_id)

     return res.status(200).json{
        200,
        {},
        "tweet delete sucessfully"
     }
}) 


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}