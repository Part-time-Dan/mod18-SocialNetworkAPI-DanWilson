const { User, Thought } = require('../models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
                .select('username email') 
                .populate({
                    path: 'thoughts',
                    select: 'thoughtText createdAt reactions.reactionBody reactions.username', 
                })
                .populate({
                    path: 'friends',
                    select: 'username', 
                });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userObj = user.toObject();
            userObj.friendCount = user.friendCount; 

            res.json(userObj);
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
            console.log(user.thoughts)

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Delete the user's associated thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            // Delete the user
            await User.deleteOne({ _id: user._id });

            res.json({ message: `User '${user.username}' and associated thoughts deleted` });
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
            );
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const newFriend = await User.findById(req.params.friendId);
    
            if (!newFriend) {
                return res.status(404).json({ message: 'Friend not found' });
            }
    
            res.json({ message: `${newFriend.username} added as a friend` });
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
            );
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const removedFriend = await User.findById(req.params.friendId);
            if (!removedFriend) {
                return res.status(404).json({ message: 'Friend not found' });
            }
    
            res.json({ 
                message: `${removedFriend.username} is no longer a friend`});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;
