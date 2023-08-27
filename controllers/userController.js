const { User, Thought } = require('../models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteUser: async (req, res) => {
        console.log(req.params.id);
        try {
            const user = await User.findById(req.params.id);
            console.log(user)

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Delete the user's associated thoughts
            // await Thought.deleteMany({ username: user.username });

            // Delete the user
            await user.remove();

            res.json({ message: 'User and associated thoughts deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    removeFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;
