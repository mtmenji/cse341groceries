const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Users']
    mongodb.getDatabase().db().collection('users').find().toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('users').find({_id: userId}).toArray().then((users) => {
        if (users.length === 0) {
            return res.status(404).json('User not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while removing the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}