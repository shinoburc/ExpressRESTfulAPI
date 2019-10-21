const express = require('express');
const router = express.Router();
const controller = require('../../controllers/food');

// CRUD RESTful API

/**
 * @swagger
 * /api/foods:
 *   post:
 *     description: Create foods.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Food name.
 *         in: body
 *         required: true
 *         type: string
 *       - name: price
 *         description: Food price.
 *         in: body
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Success
 *         example:
 *          result:
 *            name: FoodName
 *            price: 790
 */
router.post('/', controller.create);


/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     description: Get Food.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Food id.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success.
 *         examples: 
 *           food:
 *              _id: 5dad9f0b1927ab7fa97e110d
 *              name: FoodName
 *              price: 790
 */
router.get('/',  controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
