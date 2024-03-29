const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// formatting for timestamps
const dateFormat = timestamp => {
    return timestamp.toISOString(); 
};

module.exports = reactionSchema;
