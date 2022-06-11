const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    modal: String,
    company: String,
    price: Number,
    categories: String,
});

module.exports = mongoose.model('products', ProductSchema)