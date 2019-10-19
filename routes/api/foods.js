var express = require('express');
var router = express.Router();

// CRUD RESTful API
var foods = [
  {
    id: "0",
    name: "味噌マヨチキン丼",
    price: "790"
  },{
    id: "1",
    name: "ネギ塩豚カルビ丼",
    price: "890"
  },{
    id: "2",
    name: "自家製タルタルの炙りチーズサーモン丼",
    price: "950"
  }
]

// Create
router.post('/', function(req, res) {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "content can not be empty"
    });
  }

  const food = {
    name: req.body.name,
    price: req.body.price
  }
  console.log(food);
  // food.save
  res.send(req.body)
});

// Read(find all)
router.get('/', function(req, res, next) {
  res.json(foods);
});
// Read(find by id)
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  const food = foods[id];

  res.json(food);
});

// Update
router.put('/:id', function(req, res) {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "content can not be empty"
    });
  }

  var id = req.params.id;
  const food = foods[id];
  // food.update

  res.json(food);
});

// DELETE
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  const food = foods[id];
  // food.delete

  res.json(food);
});

module.exports = router;
