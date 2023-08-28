const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction'); 

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction], // embed Reaction as a subdocument in Thought model
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true,
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const dateFormat = timestamp => {
    return timestamp.toISOString(); 
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
