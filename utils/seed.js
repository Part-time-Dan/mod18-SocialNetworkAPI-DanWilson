const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { seedUsernames, seedEmails, seedThoughts, seedReacts } = require('./data');

// Moved randomize array item code here
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

connection.on('error', (err) => console.error(err));

// Inside your seed.js file
connection.once('open', async () => {
    console.log('Connected to database');

    try {
        // Delete existing data
        await Thought.deleteMany({});
        await User.deleteMany({});

        const users = [];
        const thoughts = [];

        // Generate and insert users and thoughts
        for (let i = 0; i < seedUsernames.length; i++) {
            const user = await User.create({
                username: seedUsernames[i],
                email: seedEmails[i],
            });
        
            users.push(user);
        
            // Create thoughts and associate them with the user
            const thought = await Thought.create({
                thoughtText: seedThoughts[i],
                username: user.username,
                userId: user._id, // Store the user's _id in the thought
                reactions: Array.from({ length: 3 }, () => ({
                    reactionBody: getRandomArrItem(seedReacts),
                    username: getRandomArrItem(seedUsernames),
                })),
            });
        
            thoughts.push(thought);
        
            // Update the user's thoughts array
            user.thoughts.push(thought._id);
            await user.save();
        }

        // Display Users Collection
        console.log('Users Collection:');
        console.table(
            users.map(user => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                thoughts: user.thoughts.length > 0 ? user.thoughts.map(thought => thought.toString()).join(', ') : 'None' // Format thoughts array
            }))
        );

        // Display Thoughts Collection
        console.log('Thoughts Collection:');
        console.table(
            thoughts.map(thought => ({
                _id: thought._id,
                thoughtText: thought.thoughtText,
                username: thought.username,
                userId: thought.userId,
                reactions: thought.reactions.map(reaction => ({
                    reactionBody: reaction.reactionBody,
                    username: reaction.username
                }))
            }))
        );

        // Populate friends and thoughts arrays for each user
        for (const user of users) {
            const friends = users
                .filter(u => u._id.toString() !== user._id.toString())
                .slice(0, 5)
                .map(u => u._id);

            user.friends = friends;
            user.thoughts = thoughts
                .filter(thought => thought.username === user.username)
                .map(thought => thought._id);

            await user.save();
        }

        console.log('Seeding complete! 🌱');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
});


