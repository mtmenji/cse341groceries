const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const {MongoClient, ObjectId} = require('mongodb');
const mongoURI = 'mongodb+srv://men18007:bxWsACVvKYT2HFY5@cse341.brisfu9.mongodb.net/groceries';
const dbName = 'groceries';
const collectionName = 'orders';
const getAll= require("../controllers/orders")

const app = new express();
app.use('/', router);

describe('Routes', function () {

    test('responds to /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Hello World') 
    })




    
    // test('responds to /payments', async () => {
    //     const payments = [{"_id":"6689e7590b756ba4f23e67f8","user":"Jane Smith","card_number":"2345-6789-0123-4567","expiration_date":"11/24","security_code":"123"}];
    //     const res = await request(app).get('/payments');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toEqual(payments);
    // })





    // test('responds to /orders/:id', async () => {
    //     const orderById = [{"user":"John Doe","date":"2024-06-10","items":"pizza, soda"}]
    //     const res = await request(app).get('/orders/6689e76a0b756ba4f23e6f03');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toEqual(orderById);
    // })




    // describe('getOrderById', () => {
    //     let connection;
    //     let db;

    //     beforeAll(async () => {
    //         connection = await MongoClient.connect(globalThis.__MONOGO_URI__, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //         });
    //         db = await connection.db(globalThis.__groceries__);
    //     });

    //     afterAll(async () => {
    //         await connection.close();
    //     });

    //     it('should get an order by id in collection', async () => {
    //         const order = await connection.getById('6689e76a0b756ba4f23e6f03');
    //         expect(order).toEqual({"_id":"6689e76a0b756ba4f23e6f03","user":"John Doe","date":"2024-06-10","items":"pizza, soda"})
    //     })
    // })



    // jest.mock('mongodb');

    // describe('Get /orders route', () => {
    //     let app;
    //     let mockCollection;

    //     const mockClient = new MongoClient('mongodb+srv://men18007:bxWsACVvKYT2HFY5@cse341.brisfu9.mongodb.net/groceries', { useNewUrlParser: true, useUnifiedTopology: true });
    //     mockCollection = mockClient.db('groceries').collection('orders');
    //     mockCollection.find = jest.fn();
    //     mockCollection.toArray = jest.fn();

    //     app = new express();
    //     app.use('/orders', getAll);

    //     const mockDocument = [{_id:"6689e76a0b756ba4f23e6f03","user":"John Doe","date":"2024-06-10","items":"pizza, soda"}];
    //     mockCollection.find.mockReturnValue({ toArray: jest.fn().mockResolvedValue(mockDocument) });

    //     afterAll(async () => {
    //         await mockCollection.deleteMany({});
    //         await mockClient.close();
    //     })
    //     it('should return all', async () => {
    //         const response = await request(app).get('/orders');

    //         expect(response.status).toBe(200);
    //         expect(response.body).toEqual([{_id:"6689e76a0b756ba4f23e6f03","user":"John Doe","date":"2024-06-10","items":"pizza, soda"}]);
    //     })
    // })
})