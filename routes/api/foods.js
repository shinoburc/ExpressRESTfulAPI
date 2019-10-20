const express = require('express');
const router = express.Router();
const food = require('../../controllers/food');

router.post('/', food.create);
router.get('/', food.findAll);
router.get('/:id', food.findOne);
router.put('/:id', food.update);
router.delete('/:id', food.delete);

module.exports = router;
