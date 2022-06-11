const mongoose = require('mongoose');

const UserSchemas = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Full_Name: String,
    Email: String,
    Password: String,
    Tagree: Boolean
},{ timestamps: true });

module.exports = mongoose.model('users', UserSchemas)