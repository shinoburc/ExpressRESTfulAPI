const express = require('express');
const router = express.Router();
const controller = require('../../controllers/food');

// CRUD RESTful API

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       description: Food
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Name
 *           example: 味噌マヨチキン丼
 *         price:
 *           type: number
 *           description: Price
 *           example: 790
 *     FoodAndId:
 *       type: object
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: id
 *               example: 5dad9f0b1927ab7fa97e110d
 *         - $ref: '#/components/schemas/Food'
 *     Error:
 *       type: object
 *       description: erros
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 example: Invalid value
 *               param: 
 *                 type: string
 *                 example: name
 *               location:
 *                 type: string
 *                 example: body
 *   parameters:
 *     idParam:
 *       name: id
 *       in: query
 *       description: id
 *       required: true
 *       schema:
 *         parameters:
 *           _id:
 *             type: string
 *             description: id
 *             example: 5dad9f0b1927ab7fa97e110d
 *     foodParam:
 *       name: body
 *       in: body
 *       description: Food
 *       required: true
 *       schema:
 *         $ref: '#/components/schemas/Food'
 */
/**
 * @swagger
 * /api/foods:
 *   post:
 *     tags:
 *       - foods
 *     summary: Create Food
 *     description: Create Food 
 *     parameters:
 *       - $ref: '#/components/parameters/foodParam'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/FoodAndId'
 *       422:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/foods:
 *   get:
 *     tags:
 *       - foods
 *     summary: Read Food List
 *     description: Read Food List
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FoodAndId'
 *       500:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
router.get('/',  controller.findAll);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     tags:
 *       - foods
 *     summary: Read Food
 *     description: Read Food
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/FoodAndId'
 *       404:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *       500:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.findOne);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     tags:
 *       - foods
 *     summary: Update Food
 *     description: Update Food 
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *       - $ref: '#/components/parameters/foodParam'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/FoodAndId'
 *       404:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *       422:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *       500:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     tags:
 *       - foods
 *     summary: Delete Food
 *     description: Delete Food
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/components/schemas/FoodAndId'
 *       404:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *       500:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
router.delete('/:id', controller.delete);

module.exports = router;
