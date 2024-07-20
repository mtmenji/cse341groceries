const request = require('supertest');
const express = require('express');
const { initDb } = require('../data/database');
const app = express();

app.use(express.json());
app.use('/', require('../routes'));

beforeAll((done) => {
    initDb((err) => {
        if (err) {
            console.error('Failed to initialize database', err);
            process.exit(1);
        }
        done();
    });
});

describe('GET /orders', () => {
  it('should return all orders', async () => {
    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /orders/:id', () => {
  it('should return a single order by ID', async () => {
    const orderId = '669bb979c28e95c1576ec7e1';
    const response = await request(app).get(`/orders/${orderId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 404 if order not found', async () => {
    const invalidOrderId = '779bb979c28e95c1576ec7e1';
    const response = await request(app).get(`/orders/${invalidOrderId}`);
    expect(response.status).toBe(404);
  });
});