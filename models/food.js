const mongoose = require('mongoose');
//const Food = require('../../models/food');
const { check, validationResult } = require('express-validator');

mongoose.connect('mongodb://mongo/db', { useNewUrlParser: true, useUnifiedTopology: true });

const Food = mongoose.Schema({
    name: String,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', Food);
