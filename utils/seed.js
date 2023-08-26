const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, seedEmails, seedUsernames } = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
    console.log('Connected to database');

    // Delete existing data
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Generate and insert users
    const users = [];
    for (let i = 0; i < 10; i++) {
        users.push({
            username: seedUsernames[i], 
            email: seedEmails[i],
        });
    }
    await User.insertMany(users);

    // Generate and insert thoughts with reactions
    const thoughts = getRandomThoughts(5);
    await Thought.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
