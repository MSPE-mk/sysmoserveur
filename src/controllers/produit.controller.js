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
    if (err) {
      res.send(err);
    } else {
      ProductImage.getPictureByID(req.params.id, function (err, pictures) {
        if (err)
          res.send(err)
        res.status(200).json({ msg: 'all data of product ' + req.params.id + ' was founded ', productInfo: produit, productPictureList: pictures });
      })
    }
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
  // Create Product objet from requested information
  let produit = {
    id: 0,
    nom: req.body.nameProduct,
    reference: req.body.refProduct,
    categorie: req.body.catProduct,
    prix: req.body.priceProduct,
    disponibilite: req.body.disponibiliteProduct,
    description: req.body.descriptionProduct,
    created_at: req.body.createdAt,
    updated_at: req.body.updatedAt,
    firstPicture: req.body.firstPicture
  };

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Produit.update(req.params.id, new Produit(produit), function (err, produit) {
      if (err) {
        res.status(400).send({ error: true, message: err });
      } else {
        ProductImage.deleteProductPictures(req.params.id, (err, result) => {
          if (err)
            console.log(err);
          console.log('All pictures was removed successfully');
        })
        // upload Product Pictures when Product iformation has been saved Successfully 
        for(let i = 0;i < Object.keys(req.files).length;i++) {
          let path = '/uploads/' + req.body.catProduct + '/';
          let newImage = new ProductImage(req.params.id, req.files[i]['name'])
          // Use the mv() method to place the file somewhere on your server
          isUploadNotFailed = req.files[i].mv(__parentDir + path + req.files[i].name, function (err) {
            if (err) {
              console.log('connot upload pictures' + err);
              res.status(500).json({ message: 'Could not upload the file', error: err });
            } else {
              // save Product Pictures in data base
              ProductImage.saveImgInDB(newImage, function (err, res) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('picture added successfully  ' + res);
                }
              });
            }
          });
        } 
        res.status(200).json({ error: false, message: 'Product with ID ' + req.params.id + ' has been updated' });
      }
    });
  }
};
// Delete Product
exports.delete = function (req, res) {
  Produit.delete(req.params.id, function (err, produit) {
    if (err) {
      res.send(err);
    } else {
      ProductImage.deleteProductPictures(req.params.id, (err, result) => {
        if (err)
          res.send(err)
        res.status(200).json({ error: false, message: 'product ' + req.params.id + ' successfully deleted' });
      });

    }
  });
};
// Create a new Product && Upload Pictures
exports.createProd = function (req, res) {
  // Create Product objet from requested information
  Produit.getLastId((result) => {
    let produit = {
      id: result,
      nom: req.body.nameProduct,
      reference: req.body.refProduct,
      categorie: req.body.catProduct,
      prix: req.body.priceProduct,
      disponibilite: req.body.disponibiliteProduct,
      description: req.body.descriptionProduct,
      created_at: new Date(),
      updated_at: new Date(),
      firstPicture: req.body.firstPicture
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
          res.status(200).send({ error: false, message: 'New Product with ID ' + result + ' has been added' });
        }
      });
    }
  })
};