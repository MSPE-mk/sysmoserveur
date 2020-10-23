'use strict';
const Produit = require('../models/produit.model');
var path = require('path'),
  __parentDir = path.basename(path.dirname('server.js'));
exports.findAll = function (req, res) {
  Produit.findAll(function (err, produit) {
    console.log('all Product founded')
    if (err)
      res.send(err);
    //console.log('res', produit);
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

exports.upload = function (req, res) {
  console.log(req.body.data);
  let idProduct = req.body.data;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: 'Please upload a file!!' });
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.image;
  console.log(req.files.image.name);
  let newImage = new ProductImage(idProduct,req.files.image.name)
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__parentDir + '/uploads/climatiseurs/' + req.files.image.name, function (err) {
    if (err)
      {return res.status(500).send({ message: 'Could not upload the file', error: err });}
      else{
        Produit.saveImgInDB(newImage, function (err, produit) {
          if (err)
            res.send(err);
          res.json({ error: false, message: "product picture added successfully!", data: produit });
        });
        res.status(200).send({ message: 'Uploaded the file successfully: ' + req.files.image.name });
      }
    
  });

}
