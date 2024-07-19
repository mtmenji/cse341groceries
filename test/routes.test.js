const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const {MongoClient, ObjectId} = require('mongodb');
const mongoURI = 'mongodb+srv://men18007:bxWsACVvKYT2HFY5@cse341.brisfu9.mongodb.net/groceries';
const dbName = 'groceries';
const collectionName = 'orders';

const app = new express();
app.use('/', router);

describe('Products Routes', function () {

    test('responds to /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Hello World') 
    })

    // test('responds to /orders', async () => {
    //     const orders = [{"_id":"6689e76a0b756ba4f23e6f03","user":"John Doe","date":"2024-06-10","items":"pizza, soda"},{"_id":"6689e76a0b756ba4f23e6f05","user":"Alice Johnson","date":"2024-06-12","items":"icecream, chips"},{"_id":"6689e76a0b756ba4f23e6f06","user":"Bob Brown","date":"2024-06-13","items":"cheese, milk"},{"_id":"6689e76a0b756ba4f23e6f04","user":"Jane Smith","date":"2024-06-11","items":"bread, butter"},{"_id":"6689e76a0b756ba4f23e6f07","user":"Charlie Davis","date":"2024-06-14","items":"diapers, wet wipes"},{"_id":"669ac4fe5b18972559478713","user":"any1","date":"any1","items":"any1"}]
    //     const res = await request(app).get('/orders');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toEqual(orders);
    // })

    // test('responds to /orders/:id', async () => {
    //     const orderById = [{"user":"John Doe","date":"2024-06-10","items":"pizza, soda"}]
    //     const res = await request(app).get('/orders/6689e76a0b756ba4f23e6f03');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toEqual(orderById);
    // })

    describe('getOrderById', () => {
        let connection;
        let db;

        beforeAll(async () => {
            connection = await MongoClient.connect(globalThis.__MONOGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            db = await connection.db(globalThis.__groceries__);
        });

        afterAll(async () => {
            await connection.close();
        });

        it('should get an order by id in collection', async () => {
            const order = await connection.getById('6689e76a0b756ba4f23e6f03');
            expect(order).toEqual({"_id":"6689e76a0b756ba4f23e6f03","user":"John Doe","date":"2024-06-10","items":"pizza, soda"})
        })
    })
})