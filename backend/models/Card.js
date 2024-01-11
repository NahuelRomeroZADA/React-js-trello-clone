// backend/models/Card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;