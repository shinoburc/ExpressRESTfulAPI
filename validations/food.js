const { check, validationResult } = require('express-validator');

exports.create = [
    check('name').isString(),
    check('price').isNumeric()
  ];
exports.findAll = [];
exports.findOne = [];
exports.update = [
      check('name').isString(),
      check('price').isNumeric()
  ];
exports.delete = [];
