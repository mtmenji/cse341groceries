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

describe('GET /products', () => {
  it('should return all products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /products/:id', () => {
  it('should return a single product by ID', async () => {
    const productId = '669abaf6192b99994003b257';
    const response = await request(app).get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 404 if product not found', async () => {
    const invalidProductId = '779abaf6192b99994003b257';
    const response = await request(app).get(`/products/${invalidProductId}`);
    expect(response.status).toBe(404);
  });
});