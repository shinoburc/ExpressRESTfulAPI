const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Food = require('../../models/food');

const { check, validationResult } = require('express-validator');

mongoose.connect('mongodb://mongo/db', { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD RESTful API
// Create
router.post('/', [
    check('name').isString(),
    check('price').isNumeric()
  ],function(req, res) {
  // Request validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const food = new Food(req.body);

  food.save(function(err){
    if(!err) {
      return res.json(food)
    } else {
      return res.status(500).json({ message: 'user create faild.' });
    }
  });
});

// Read(find all)
router.get('/', function(req, res, next) {
  //res.json(foods);
  Food.find()
    .then(foods => {
      res.json(foods);
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Something wrong while retrieving foods."
    });
  });
});
// Read(find by id)
router.get('/:id', function(req, res, next) {
  Food.findById(req.params.id)
  .then(food => {
    if(!food) {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });            
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).json({
      message: "Something wrong retrieving food with id " + req.params.food
    });
  });
});

// Update
router.put('/:id', [
    check('name').isString(),
    check('price').isNumeric()
  ], function(req, res) {
  // Request validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  Food.findByIdAndUpdate(req.params.id, {
    name: req.body.name || "No name", 
    price: req.body.price,
  }, {new: true})
  .then(food=> {
    if(!food) {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).json({
      message: "Something wrong updating food with id " + req.params.id
    });
  });
});

// DELETE
router.delete('/:id', function(req, res) {
  Food.findByIdAndRemove(req.params.id)
  .then(food => {
    if(!food ) {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).json({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).json({
      message: "Could not delete food with id " + req.params.id
    });
  });
});

module.exports = router;
