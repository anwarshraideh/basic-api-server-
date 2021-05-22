'use strict';
const express = require('express');
const Clothe = require('../models/clothes.js');
const clothe = new Clothe();
const router = express.Router();



router.get('/', getClothes);
router.get('/:id', getClothesById);
router.post('/', createClothes);
router.put('/:id', updateClothe);
router.delete('/:id', deleteClothe);

function getClothes(req, res) {
  let clothesArray = clothe.read();
  res.status(200).json(clothesArray);
}


function getClothesById(req, res) {
  let colthesObject = clothe.read(req.params.id);
  res.json(colthesObject);
}



function createClothes(req, res) {
  const clotheObject = req.body;
  const resopnse = clothe.create(clotheObject);
  res.status(200).json(resopnse);
}


function updateClothe (req, res) {
  let clotheObject = req.body;
  let response = clothe.update(req.params.id, clotheObject);
  console.log(response);
  res.status(200).json(response);
}


function deleteClothe (req, res) {
  const response = clothe.delete(req.params.id);
  res.status(200).json(response);
}


module.exports = router;
