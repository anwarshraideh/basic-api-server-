'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(app);

let idFood;
let idClothe;

// errors 404
describe('Not found errors', () => {
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
describe('Correct status codes and returned data for POST routes', () => {
  it('should return all records for food from the local memory data', async () => {
    let response = await request
      .post('/food')
      .send({ type: 'salad', ingrediant: 'vigtibals' });
    expect(response.status).toEqual(200);
    idFood = response.body.id;
    expect(response.body.data).toStrictEqual({
      type: 'salad',
      ingrediant: 'vigtibals',
    });
  });
  it('should return all records for clothes from the local memory data', async () => {
    let response = await request
      .post('/clothes')
      .send({ type: 'T-shirt', color: 'white' });
    expect(response.status).toEqual(200);
    idClothe = response.body.id;
    expect(response.body.data).toStrictEqual({
      type: 'T-shirt',
      color: 'white',
    });
  });
});
// GET All
describe('Correct status codes and returned data for GET routes', () => {
  it('should return all records for food from the local memory data', async () => {
    let response = await request.get('/food');
    expect(response.status).toEqual(200);
  });
  it('should return all records for clothes from the local memory data', async () => {
    let response = await request.get('/clothes');
    expect(response.status).toEqual(200);
  });
});
// GET by ID
describe('Correct status codes and returned data for GET/:id routes', () => {
  it('should return one records with same id for food from the local memory data', async () => {
    let response = await request.get(`/food/${idFood}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idFood);
  });
  it('should return one records with same id for clothes from the local memory data', async () => {
    let response = await request.get(`/clothes/${idClothe}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idClothe);
  });
});
// UPDATE
describe('Correct status codes and returned data for UPDATE/:id routes', () => {
  it('should return one records with same id and data sent for food from the local memory data', async () => {
    let response = await request
      .put(`/food/${idFood}`)
      .send({ type: 'steak', ingrediant: 'meat' });
    expect(response.status).toEqual(200);
    expect(response.body.data).toStrictEqual({
      type: 'steak',
      ingrediant: 'meat',
    });
  });
  it('should return one records with same id for clothes from the local memory data', async () => {
    let response = await request
      .put(`/clothes/${idClothe}`)
      .send({ type: 'jeans', color: 'blue' });
    expect(response.status).toEqual(200);
    expect(response.body.data).toStrictEqual({ type: 'jeans', color: 'blue' });
  });
});
// DELETE
describe('Correct status codes and returned data for Delete/:id routes', () => {
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
