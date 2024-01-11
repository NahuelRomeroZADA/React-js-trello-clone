// backend/models/List.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: String,
});

const List = mongoose.model('List', listSchema);

module.exports = List;