import mongoose, {Schema} from "mongoose";
import { type } from "os";

const userSchema = new Schema({
     usrname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index : true,  
    },
    email:{
        type: String,   
        required: true,             
        unique: true,
        lowercase: true,
        trim: true,      
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index : true, 
    },
    avatar: {
        type: String,  // we used cluoudinary here
        required: true,
        trim: true,
        index : true, 
    },
    coverImage : {
        type: String,
    },
    watchHistory : {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    }
},
{
    timestamps: true
});
export const User =  mongoose.model('User', userSchema);
// during making schema we used validation and unique key to make sure that the data is correct and unique. and the alligns with user requirements 
// after schema write ref here