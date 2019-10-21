const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const Food = mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 1
      //uniq: true
    },
    price: {
      type: Number,
      min: 0
    }
}, {
    timestamps: true
});

const model = mongoose.model('Food', Food);

// Validations
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
