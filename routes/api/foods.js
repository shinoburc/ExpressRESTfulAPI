const express = require('express');
const router = express.Router();
const controller = require('../../controllers/food');

// CRUD RESTful API


/**
 * @swagger
 * definitions:
 *   schemas:
 *    NewFood:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: 味噌マヨチキン丼
 *        price:
 *          type: number
 *          example: 790
 *    Food:
 *      $ref: '#/definitions/schemas/NewFood'
 *      required:
 *        name
 *        password
 *      properties:
 *        id:
 *          type: string
 *          example: 1hoge123
 */

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Foods
 *     description: Foods CRUD
 *     parameters:
 *       - in: body
 *         name: Food
 *         description: Food
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/NewFood'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: 認証トークン
 *       422:
 *         description: Fail
 *         schema:
 *           type: string
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/foods:
 *   get:
 *     description: Get Food list.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success.
 *         schema:
 *           $ref: '#/definitions/schemas/Food'
 *         example: 
 *           food:
 *              _id: 5dad9f0b1927ab7fa97e110d
 *              name: FoodName
 *              price: 790
 */
router.get('/',  controller.findAll);

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
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               description: Food name
 *             price:
 *               type: number
 *               description: Food price
 *         example: 
 *           food:
 *              _id: 5dad9f0b1927ab7fa97e110d
 *              name: FoodName
 *              price: 790
 */
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
