const seedUsernames = [
    'Chris',
    'Jill',
    'Leon',
    'Claire',
    'Albert',
    'Barry',
    'Rebecca',
    'Ada',
    'Sheva',
    'Ethan',
];

const seedEmails = seedUsernames.map(username => `${username.toLowerCase()}@gmail.com`);

const seedThoughts = [
    'seed thought 1',
    'seed thought 2',
    'seed thought 3',
    'seed thought 4',
    'seed thought 5',
    'seed thought 6',
    'seed thought 7',
    'seed thought 8',
    'seed thought 9',
    'seed thought 10',
];

const seedReacts = [
    'omg',
    'wow',
    'pog',
    'lit',
    'vibes',
    'W',
    'L',
    'no one liked that',
    'several ppl r typing',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


const getRandomName = () =>
  `${getRandomArrItem(seedUsernames)}`;

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {

    const username = getRandomArrItem(seedUsernames);

    results.push({
        thoughtText: getRandomArrItem(seedThoughts),
        username: username,
        reactions: [...getReactions(3)],
    });
  }
  return results;
};

// Create the tags that will be added to each application
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(seedReacts);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(seedReacts),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, seedEmails, seedUsernames };
