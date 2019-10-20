const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Food = require('../../models/food');

mongoose.connect('mongodb://mongo/db', { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD RESTful API
// Create
router.post('/', function(req, res) {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "content can not be empty"
    });
  }

  const food = new Food(req.body);

  food.save(function(err){
    if(!err) {
      return res.json(food)
    } else {
      return res.status(500).send('user create faild.');
    }
  });
});

// Read(find all)
router.get('/', function(req, res, next) {
  //res.json(foods);
  Food.find()
    .then(foods => {
      res.send(foods);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while retrieving foods."
    });
  });
});
// Read(find by id)
router.get('/:id', function(req, res, next) {
  Food.findById(req.params.id)
  .then(food => {
    if(!food) {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });            
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).send({
      message: "Something wrong retrieving food with id " + req.params.food
    });
  });
});

// Update
router.put('/:id', function(req, res) {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "content can not be empty"
    });
  }

  Food.findByIdAndUpdate(req.params.id, {
    name: req.body.name || "No name", 
    price: req.body.price,
  }, {new: true})
  .then(food=> {
    if(!food) {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).send({
      message: "Something wrong updating food with id " + req.params.id
    });
  });
});

// DELETE
router.delete('/:id', function(req, res) {
  Food.findByIdAndRemove(req.params.id)
  .then(food => {
    if(!food ) {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });
    }
    res.json(food);
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Food not found with id " + req.params.id
      });                
    }
    return res.status(500).send({
      message: "Could not delete food with id " + req.params.id
    });
  });
});

module.exports = router;
