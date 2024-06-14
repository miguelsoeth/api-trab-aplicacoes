const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    user: String,
    pwd: String,
    level: String,
    status: Boolean
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
