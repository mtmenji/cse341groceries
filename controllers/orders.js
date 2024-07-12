const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

exports.createOrder = async (req, res) => {
  const { username } = req.params;
  const order = new Order({ username, groceries: [] });
  await order.save();
  res.status(201).send(order);
};

exports.getOrder = async (req, res) => {
  const { username } = req.params;
  const order = await Order.findOne({ username }).populate('groceries');
  if (!order) {
    return res.status(404).send('Order not found');
  }
  res.send(order);
};

exports.addOrUpdateGrocery = async (req, res) => {
  const { username, groceryId } = req.params;
  const { name, quantity } = req.body;

  const grocery = await Grocery.findByIdAndUpdate(groceryId, { name, quantity }, { new: true, upsert: true });

  const order = await Order.findOneAndUpdate(
    { username },
    { $addToSet: { groceries: grocery._id } },
    { new: true, upsert: true }
  ).populate('groceries');

  res.send(order);
};

exports.deleteGrocery = async (req, res) => {
  const { username, groceryId } = req.params;

  const order = await Order.findOneAndUpdate(
    { username },
    { $pull: { groceries: groceryId } },
    { new: true }
  ).populate('groceries');

  if (!order) {
    return res.status(404).send('Order not found');
  }

  res.send(order);
};