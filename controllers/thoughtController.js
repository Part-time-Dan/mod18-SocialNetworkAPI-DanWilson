const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().populate('username').populate('reactions');

            const reactionCount = thoughts.map(thought => ({
                _id: thought._id,
                thoughtText: thought.thoughtText,
                username: thought.username,
                reactionCount: thought.reactions.length // Count of reactions
            }));

            res.json(reactionCount);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('username').populate('reactions.username');

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    createThought: async (req, res) => {
        try {
            
            const thought = await Thought.create(req.body);
    
            await User.findByIdAndUpdate(
                req.body.userId, // "userId" for the JSON data to match the User _id
                { $push: { thoughts: thought._id } }, // push the new thought's ID into the thoughts array
                { new: true } // return the updated user document
            );
    
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            );
    
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            console.log(thought)

            if (!thought) {
                return res.status(400).json({ message: 'Thought not found' });
            }

            await Thought.deleteOne({ _id: thought._id });

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;
