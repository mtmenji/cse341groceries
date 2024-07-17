const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllOrders = async (req, res) => {
    //#swagger.tags=['Order']
    const username = req.params.username;
    const result = await mongodb.getDatabase().db().collection('orders').find({ username });
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    });
};

const getOrderById = async (req, res) => {
    //#swagger.tags=['Order']
    const orderId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('orders').find({ _id: orderId });
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
    });
};

const createOrder = async (req, res) => {
    //#swagger.tags=['Order']
    const order = {
        username: req.params.username,
        orderDate: req.body.orderDate,
        groceryItems: req.body.groceryItems
    };
    const response = await mongodb.getDatabase().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || "An error occurred while creating this order");
    }
};

const updateGroceryItem = async (req, res) => {
    //#swagger.tags=['Order']
    if (!ObjectId.isValid(req.params.groceryId)) {
        res.status(400).json('Must use a valid grocery item id.');
    }
    const groceryId = new ObjectId(req.params.groceryId);
    const update = {
        $set: {
            'groceryItems.$.name': req.body.name,
            'groceryItems.$.quantity': req.body.quantity
        }
    };
    const response = await mongodb.getDatabase().db().collection('orders').updateOne(
        { username: req.params.username, 'groceryItems._id': groceryId },
        update
    );
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while updating this grocery item");
    }
};

const deleteGroceryItem = async (req, res) => {
    //#swagger.tags=['Order']
    if (!ObjectId.isValid(req.params.groceryId)) {
        res.status(400).json('Must use a valid grocery item id.');
    }
    const groceryId = new ObjectId(req.params.groceryId);
    const response = await mongodb.getDatabase().db().collection('orders').updateOne(
        { username: req.params.username },
        { $pull: { groceryItems: { _id: groceryId } } }
    );
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while deleting this grocery item");
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateGroceryItem,
    deleteGroceryItem
};