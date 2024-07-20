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

describe('GET /payments', () => {
  it('should return all payments', async () => {
    const response = await request(app).get('/payments');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /payments/:id', () => {
  it('should return a single payment by ID', async () => {
    const paymentId = '6689e7590b756ba4f23e67f9';
    const response = await request(app).get(`/payments/${paymentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 404 if payment not found', async () => {
    const invalidPaymentId = '7789e7590b756ba4f23e67f8';
    const response = await request(app).get(`/payments/${invalidPaymentId}`);
    expect(response.status).toBe(404);
  });
});