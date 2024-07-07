const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized!");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            console.log("Successful Database Call");
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            console.log("Failed Database Call");
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized.')
    }
    console.log("Got database");
    return database;
};

module.exports = {
    initDb,
    getDatabase
}