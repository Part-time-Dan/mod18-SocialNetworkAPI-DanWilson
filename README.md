[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

# Social Network API Backend (NoSQL)
CRUD interactions using a non-relational database

## Description
This project simulates functionality of a basic social network API that manages user data on the backend in a non-relational database. The criteria of the project was to provide CRUD routing for users, user posts (named 'thoughts' for this specific activity), user friend lists, and responses to user posts (named 'reactions'). This project has no deployed front end and is only available as code that can be tested in a local environment.

Additional attention was taken to create a professional directory structure, as well as providing some automation logic to populate seed data to test with the API.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Questions](#questions)
- [License](#license)
- [Video/Demos](#demo)

## Installation
- Apps
    - VScode (or equivalent code editor)
    - MongoDB Compass (to easily manage the database)
    - Insomnia (to test routes)
- Packages
    - Node.js
    - Express
    - mongoDB
    - mongoose 
    - nodemon (recommended to run the live server, but not required)

## Usage
To run this program, clone this repository to a development environment like VScode. Open the terminal window. Run ```npm install``` to install dependencies listed in the package.json.

From the root directory, type ```npm run seed``` into the terminal CLI to create your database and seed collections. You can check your databases on MongoDB Compass. Look for "socialnetworkDB" with 2 collections contained within: "thoughts" and "users". If seeded correctly, expect user documents containing thoughts and friends arrays (1 thought, 5 friends per user) and thoughts documents containing reactions array subdocs (3 reactions per thought).

Next, type ```npm run dev``` in the terminal. You should receive confirmation that your server is live: 

```sh
> nodemon index

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
API server running on port 3001!
```

From here, use Insomia to hit the following CRUD routes using the address bar (URL should look something like this: ```http://localhost:3001/api/users```):

**`/api/users`**
* `GET` all users
* `POST` a new user: 
```json
// example data
{
  "username": "Mia",
  "email": "mia@gmail.com"
}
```

---

**`/api/users/:userId`**
* `GET` a single user by ID and populated thought and friend data
* `PUT` to update a user (provide JSON body with new data)
* `DELETE` to remove a user

**BONUS**: Remove a user's associated thoughts when deleted.

---

**`/api/users/:userId/friends/:friendId`**
* `POST` to add a new friend to a user's friend list 
* `DELETE` to remove a friend from a user's friend list 

---

**`/api/thoughts`**
* `GET` to get all thoughts 
 
* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field) 
```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "Jill",
  "userId": "5edff358a0fcb779aa7b118b" // this userId will be randomly generated when the data is seeded.
}
```

---

**`/api/thoughts/:thoughtId`**
* `GET` to get a single thought by ID
* `PUT` to update a thought
* `DELETE` to remove a thought

---

**`/api/thoughts/:thoughtId/reactions`**
* `POST` to create a reaction stored in a single thought's `reactions` array field 
* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value 

## Contributions
This is an educational project. No contributions are being accepted.
 

## Questions
If you have questions about this project:

Find me on GitHub -> [Part-time-Dan](https://github.com/Part-time-Dan)

OR

Reach me by email here -> [danielwilson.web@gmail.com](mailto:danielwilson.web@gmail.com)


## License
For additional license information, please follow the link: [MIT](https://choosealicense.com/licenses/mit/)

## Demo


https://github.com/Part-time-Dan/mod18-SocialNetworkAPI-DanWilson/assets/126934952/952af9a2-a510-46b7-a02f-4c6961675d24

