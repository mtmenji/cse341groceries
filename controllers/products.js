const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Product']
    console.log("in controller function");
    mongodb.getDatabase().db().collection('products').find().toArray().then((products) => { 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
}

const getById = async (req, res) => {
    //#swagger.tags=['Product']
    const productId = new ObjectId(req.params.id)
    mongodb.getDatabase().db().collection('products').find({_id: productId}).toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    });
};

const addProduct = async (req, res) => {
    //#swagger.tags=['Product']
    const product = {
        name: req.body.name,
        brand: req.body.brand,
        region: req.body.region,
        category: req.body.category,
        description: req.body.description,
        price:req.body.price,
        unit: req.body.unit,
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
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
        brand: req.body.brand,
        region: req.body.region,
        category: req.body.category,
        description: req.body.description,
        price:req.body.price,
        unit: req.body.unit,
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId}, product);
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
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while deleting this product");
    }
}

module.exports = { getAll, getById, addProduct, updateproduct, deleteproduct };