const express = require('express');
const router = express.Router();
const model = require('../../models/food');
const food = require('../../controllers/food');

// CRUD RESTful API
router.post('/', model.createValidation, food.create);
router.get('/', model.findAllValidation, food.findAll);
router.get('/:id', model.findOneValidation, food.findOne);
router.put('/:id', model.updateValidation, food.update);
router.delete('/:id', model.deleteValidation, food.delete);

module.exports = router;
