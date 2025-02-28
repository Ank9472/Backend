import exp from "constants";
import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
} );


export const Playlist = mongoose.model('Playlist', playlistSchema);
// during making schema we used validation and unique key to make sure that the data is correct and unique. and the alligns with user requirements