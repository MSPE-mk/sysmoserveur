'use strict';
const Produit = require('../models/produit.model');
exports.findAll = function (req, res) {
  Produit.findAll(function (err, produit) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', produit);
    res.send(produit);
  });
};
exports.create = function (req, res) {
  const new_produit = new Produit(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Produit.create(new_produit, function (err, produit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "produit added successfully!", data: produit });
    });
  }
};
exports.findById = function (req, res) {
  Produit.findById(req.params.id, function (err, produit) {
    if (err)
      res.send(err);
    res.json(produit);
  });
};

exports.findByCategorie = function (req, res) {
  Produit.findByCategorie(req.params.id, function (err, produits) {
    if (err)
      res.send(err);
    res.json(produits);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Produit.update(req.params.id, new Produit(req.body), function (err, produit) {
      if (err)
        res.send(err);
      res.json({ error: false, message: 'produit successfully updated' });
    });
  }
};
exports.delete = function (req, res) {
  Produit.delete(req.params.id, function (err, produit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'produit successfully deleted' });
  });
};