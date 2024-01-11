const express = require('express');
const List = require('../models/List');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const list = new List({
    title: req.body.title,
  });

  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;