import mongoose  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new(
        {
            content: {
                type: String,
                required: true,
            },
            video: {
                type: Schema.Types.ObjectId,
                ref: 'Tweet',
            },
            owner: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
        {
            timestamps: true, // createdAt, updatedAt
        }
)

commentSchema.plugin(mongooseAggregatePaginate);

