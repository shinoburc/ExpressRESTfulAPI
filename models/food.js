const mongoose = require('mongoose');

const Food = mongoose.Schema({
    name: String,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', Food);
