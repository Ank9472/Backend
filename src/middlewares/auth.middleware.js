import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asynchandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async(req,__dirname,next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")

        //console.log(token);
        if(!token){
            throw new ApiError(401,"Unauthorised request")
        }

        const decodedToken = jwt.verify(token , process.env.ACESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401 , "Invalid Access Token")
        }

        req.user = user;
        next()
    }
    catch (error){
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})