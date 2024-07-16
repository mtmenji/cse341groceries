const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDatabase = (callback) => {
    if (_db) {
        console.log('Database is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!_db) {
        throw Error('Db Not Intialized');
    }
    return _db;
};

module.exports = { initDatabase, getDatabase };