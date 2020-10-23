'use strict';
const Produit = require('../models/produit.model');
const ProductImage = require('../models/productImage');
// get parent path of the server
var path = require('path'),
  __parentDir = path.basename(path.dirname('server.js'));

// Get all Product
exports.findAll = function (req, res) {
  Produit.findAll(function (err, produit) {
    console.log('all Product founded')
    if (err)
      res.send(err);
    res.send(produit);
  });
};
// find Product by ID
exports.findById = function (req, res) {
  Produit.findById(req.params.id, function (err, produit) {
    if (err)
      res.send(err);
    res.json(produit);
  });
};
// Find Product by Categorie
exports.findByCategorie = function (req, res) {
  Produit.findByCategorie(req.params.id, function (err, produits) {
    if (err)
      res.send(err);
    res.json(produits);
  });
};
// Edit Product
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
// Delete Product
exports.delete = function (req, res) {
  Produit.delete(req.params.id, function (err, produit) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'produit successfully deleted' });
  });
};
// Create a new Product && Upload Pictures
exports.createProd = function (req, res) {
  // Create Product objet from requested information
  let produit = {
    nom: req.body.nameProduct,
    reference: req.body.refProduct,
    categorie: req.body.catProduct,
    prix: req.body.priceProduct,
    disponibilite: req.body.disponibiliteProduct,
    description: req.body.descriptionProduct,
    created_at: new Date(),
    updated_at: new Date()
  };
  // create a new Product to save in dataBase
  const new_produit = new Produit(produit);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {

    // Save Product in data base
    Produit.create(new_produit, function (err, result) {
      if (err) {
        // throw ERROR when save Product failed
        res.send(err);
      } else {
        // upload Product Pictures when Product iformation has been saved Successfully 
        console.log(Object.keys(req.files).length);
        for (let i = 0; i < Object.keys(req.files).length; i++) {
          let path = '/uploads/' + produit.categorie + '/';
          let newImage = new ProductImage(result, req.files[i].name)
          // Use the mv() method to place the file somewhere on your server
          req.files[i].mv(__parentDir + path + req.files[i].name, function (err) {
            if (err) { return res.status(500).send({ message: 'Could not upload the file', error: err }); }
            else {
              // save Product Pictures in data base
              ProductImage.saveImgInDB(newImage, function (err, res) {
                if (err)
                  console.log(err);
                console.log('picture added successfully  ' + res);
              });
            }
          });
        }
        res.status(200).send({ error: false, message: 'Product has been added', data: result });
      }
    });
  }
};



