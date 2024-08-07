import mongoose, { Schema } from 'mongoose';

const homeWorkSchema = new Schema(
    {
        class: {
            type: String,
            required: true,
            enum: ['5', '6', '7', '8', '9', '10', '11', '12']
        },
        section: {
            type: String,
            required: true,
            enum: ['a', 'b', 'c', 'd', 'e', 'f', 'arts', 'science', 'commerce', 'general', 'vocational']
        },
        subject: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        heading: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        file: {
            type: String,
        }

    },
    {
        timestamps: true,
    }
)

export const HomeWork = mongoose.model('HomeWork', homeWorkSchema)