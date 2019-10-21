const Food = require('../models/food');
const { check, validationResult } = require('express-validator');

exports.create = [Food.createValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const food = new Food(req.body);

  food.save(function(err){
    if(!err) {
      return res.json(food)
    } else {
      return res.status(500).json({ message: 'food create faild.' });
    }
  });
}];

exports.findAll = [Food.findAllValidation, (req, res) => {
  Food.find()
    .then(foods => {
      res.json(foods);
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Something wrong while retrieving foods."
    });
  });
}];

exports.findOne = [Food.findOneValidation, (req, res) => {
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
}];

exports.update = [Food.updateValidation, (req, res) => {

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
}];

exports.delete = [Food.deleteValidation, (req, res) => {
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
}];
