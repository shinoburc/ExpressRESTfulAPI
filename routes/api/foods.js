const express = require('express');
const router = express.Router();
const validator = require('../../validations/food');
const food = require('../../controllers/food');

// CRUD RESTful API
router.post('/', validator.create, food.create);
router.get('/', validator.findAll, food.findAll);
router.get('/:id', validator.findOne, food.findOne);
router.put('/:id', validator.update, food.update);
router.delete('/:id', validator.delete, food.delete);

module.exports = router;
