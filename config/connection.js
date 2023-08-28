const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB, use Parser and Topology for mongoDB compatability issues
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;
