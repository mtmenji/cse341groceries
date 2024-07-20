const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Payments']
    mongodb.getDatabase().db().collection('payments').find().toArray().then((payments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(payments);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Payments']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid payment id to find a payment.');
    }
    const paymentId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('payments').find({_id: paymentId}).toArray().then((payments) => {
        if (payments.length === 0) {
            return res.status(404).json('Payment not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(payments[0]);
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
};

const createPayment = async (req, res) => {
    //#swagger.tags=['Payments']
    const payment = {
        user: req.body.user,
        card_number: req.body.card_number,
        expiration_date: req.body.expiration_date,
        security_code: req.body.security_code
    };
    const response = await mongodb.getDatabase().db().collection('payments').insertOne(payment);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the payment.');
    }
};

const updatePayment = async (req, res) => {
    //#swagger.tags=['Payments']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid payment id to update a payment.');
    }
    const paymentId = new ObjectId(req.params.id);
    const payment = {
        user: req.body.user,
        card_number: req.body.card_number,
        expiration_date: req.body.expiration_date,
        security_code: req.body.security_code
    };
    const response = await mongodb.getDatabase().db().collection('payments').replaceOne({_id: paymentId}, payment);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the payment.');
    }
};

const deletePayment = async (req, res) => {
    //#swagger.tags=['Payments']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid payment id to delete a payment.');
    }
    const paymentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('payments').deleteOne({_id: paymentId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while removing the payment.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createPayment,
    updatePayment,
    deletePayment
}