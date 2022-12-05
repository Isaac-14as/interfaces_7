const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
  name: String,
  date_of_birth: String,
});

module.exports = mongoose.model('Authors', authorsSchema);