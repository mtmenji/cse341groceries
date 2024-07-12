const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  items: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);