var path = require('path'),
    __parentDir = path.dirname(module.parent.filename);
const express = require('express')
const router = express.Router()
const authentication = require('../controllers/authentification');
const produitController =   require('../controllers/produit.controller');
// Retrieve all product
router.get('/', produitController.findAll);
// Create a new product
router.post('/', produitController.createProd);
// Retrieve a single product with id
router.get('/:id', produitController.findById);
// Retrieve a list of product with categorie
router.get('/byCatg/:id', produitController.findByCategorie);
// Retrieve all Featured Poroduct 
router.get('/featuredProduct/:id',produitController.featuredProd);
// Update a produit with id
router.put('/:id', produitController.update);
// Delete a produit with id
router.delete('/:id', produitController.delete);
// Delete a picture whith id 
router.delete('/picture/:id',produitController.deletePicture);
// Retrieve pictures list of product
router.get('/pictures/:id',produitController.getPicture)
// add Picture to specific product
router.post('/picture',produitController.addPicture);
// autentification
router.post('/login',authentication.login);
// Get user By Id
router.get('/user/:id',authentication.getUserById);
    
module.exports = router