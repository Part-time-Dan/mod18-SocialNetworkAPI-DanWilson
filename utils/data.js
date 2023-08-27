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

module.exports = { seedUsernames, seedEmails, seedThoughts, seedReacts };