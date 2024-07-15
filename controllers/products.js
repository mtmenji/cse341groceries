const mongodb = require('../data/connect')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Product']
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
};

const getById = async (req, res) => {
    //#swagger.tags=['Product']
    const productId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('products').find('_id: productId');
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    });
};

const addProduct = async (req, res) => {
    //#swagger.tags=['Product']
    const product = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price:req.body.price,
        units: req.body.units,
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(products);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || "An error occured while adding this product");
    }
};

const updateproduct = async (req, res) => {
    //#swagger.tags=['Product']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id.');
    }
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price:req.body.price,
        units: req.body.units,
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productIdId}, product);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating this product");
    }
}

const deleteproduct = async (req, res) => {
    //#swagger.tags=['Product']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id.');
    }
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productIdId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while deleting this product");
    }
}

module.exports = { getAll, getById, addProduct, updateproduct, deleteproduct };