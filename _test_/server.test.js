'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(app);

let idFood;
let idClothe;

// errors 404
describe('server test', () => {
  it('should return a 404 error on bad route', async () => {
    let response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('should return a 404 error on bad method', async () => {
    let response = await request.post('/foo');
    expect(response.status).toEqual(404);
  });

});

// POST
describe('POST routes', () => {
  it('should return all records for food ', async () => {
    let response = await request
      .post('/food')
      .send({ type: 'healthy', name: 'soap' });
    expect(response.status).toEqual(200);
    idFood = response.body.id;
    expect(response.body.data).toStrictEqual({
      type: 'healthy',
      name: 'soap',
    });
  });
  it('should return all records for clothes', async () => {
    let response = await request
      .post('/clothes')
      .send({ type: 'blouse', color: 'white' });
    expect(response.status).toEqual(200);
    idClothe = response.body.id;
    expect(response.body.data).toStrictEqual({
      type: 'blouse',
      color: 'white',
    });
  });
});
// GET All
describe('GET routes', () => {
  it('should return all records for food ', async () => {
    let response = await request.get('/food');
    expect(response.status).toEqual(200);
  });
  it('should return all records for clothes ', async () => {
    let response = await request.get('/clothes');
    expect(response.status).toEqual(200);
  });
});
// GET by ID
describe(' GET/:id routes', () => {
  it('should return one records with same id for food ', async () => {
    let response = await request.get(`/food/${idFood}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idFood);
  });
  it('should return one records with same id for clothes ', async () => {
    let response = await request.get(`/clothes/${idClothe}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idClothe);
  });
});

// UPDATE

describe('UPDATE/:id routes', () => {
  it('should return one records with same id and data sent for food', async () => {
    let response = await request
      .put(`/food/${idFood}`)
      .send({ type: 'fastfood', name: 'burger' });
    expect(response.status).toEqual(200);
    expect(response.body.data).toStrictEqual({
      type: 'fastfood',
      name: 'burger',
    });
  });
  it('should return one records with same id for clothes', async () => {
    let response = await request
      .put(`/clothes/${idClothe}`)
      .send({ type: 'jacket', color: 'red' });
    expect(response.status).toEqual(200);
    expect(response.body.data).toStrictEqual({ type: 'jacket', color: 'red' });
  });
});


// DELETE
describe('Delete/:id routes', () => {
  it('should return null when data is deleted from food', async () => {
    let response = await request.delete(`/food/${idFood}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ message: null });
  });
  it('should return null when data is deleted from clothes', async () => {
    let response = await request.delete(`/clothes/${idClothe}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ message: null });
  });
});

