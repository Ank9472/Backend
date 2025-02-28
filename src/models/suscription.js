import mongoose  from "mongoose";

const suscriptionSchema = new(
        {
            user: {
                type: Schema.Types.ObjectId,  //one who is subscribing
                ref: 'User',
            },
            channel: {
                type: Schema.Types.ObjectId, //one to whom user is subscribing
                ref: 'User',
            },
        },
        {
            timestamps: true, // createdAt, updatedAt
        }
)

export const Suscription = mongoose.model('Suscription', suscriptionSchema);
// during making schema we used validation and unique key to make sure that the data is correct and unique. and the alligns with user requirements