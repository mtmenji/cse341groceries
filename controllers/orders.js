const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllOrders = (req, res) => {
    //#swagger.tags=['Orders']
    mongodb.getDatabase().db().collection('orders').find().toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const getOrderById = async (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid payment id to find a order.');
    }
    const orderId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('orders').find({_id: orderId}).toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const createOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    const order = {
        user: req.body.user,
        date: req.body.date,
        items: req.body.items
    };
    const response = await mongodb.getDatabase().db().collection('orders').insertOne(order);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the order.');
    }
};

const updateOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid order id to update a order.');
    }
    const orderId = new ObjectId(req.params.id);
    const order = {
        user: req.body.user,
        date: req.body.date,
        items: req.body.items
    };
    const response = await mongodb.getDatabase().db().collection('orders').replaceOne({_id: orderId}, order);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the order.');
    }
};

const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid order id to delete a order.');
    }
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('orders').deleteOne({_id: orderId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while removing the order.');
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};