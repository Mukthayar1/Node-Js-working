const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Product_Name: String,
    Services: String,
    Urgent: Boolean,
    Detail: String,
    Create_Date_Time: Date,
    Update_Date_Time: Date,
    Create_By: String

});

module.exports = mongoose.model('products', ProductSchema)
