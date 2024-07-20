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

describe('GET /users', () => {
  it('should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /users/:id', () => {
  it('should return a single user by ID', async () => {
    const userId = '6689e78f0b756ba4f23e8141';
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 404 if user not found', async () => {
    const invalidUserId = '7789e78f0b756ba4f23e8141';
    const response = await request(app).get(`/users/${invalidUserId}`);
    expect(response.status).toBe(404);
  });
});