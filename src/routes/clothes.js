'use strict';
const express = require('express');
const Clothe = require('../models/clothes.js');
const clothe = new Clothe();
const router = express.Router();

const getClothes = (req, res) => {
  let clothesArray = clothe.read();
  res.status(200).json(clothesArray);
};
const getClothesById = (req, res) => {
  let colthesObject = clothe.read(req.params.id);
  res.json(colthesObject);
};
const createClothes = (req, res) => {
  const clotheObject = req.body;
  const resopnse = clothe.create(clotheObject);
  res.status(200).json(resopnse);
};
const updateClothe = (req, res) => {
  let clotheObject = req.body;
  let response = clothe.update(req.params.id, clotheObject);
  console.log(response);
  res.status(200).json(response);
};

const deleteClothe = (req, res) => {
  const response = clothe.delete(req.params.id);
  res.status(200).json(response);
};

router.get('/', getClothes);
router.get('/:id', getClothesById);
router.post('/', createClothes);
router.put('/:id', updateClothe);
router.delete('/:id', deleteClothe);

module.exports = router;
