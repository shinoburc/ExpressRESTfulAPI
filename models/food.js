const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const Food = mongoose.Schema({
    name: String,
    price: Number
}, {
    timestamps: true
});

const model = mongoose.model('Food', Food);

model.createValidation = [
      check('name').isString(),
      check('price').isNumeric()
    ];
model.findAllValidation = [];
model.findOneValidation = [];
model.updateValidation = [
    check('name').isString(),
    check('price').isNumeric()
  ];
model.deleteValidation = [];

module.exports = model;
