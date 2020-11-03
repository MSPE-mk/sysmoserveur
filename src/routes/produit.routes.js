var path = require('path'),
    __parentDir = path.dirname(module.parent.filename);
const express = require('express')
const router = express.Router()
const authentication = require('../controllers/authentification');
const produitController =   require('../controllers/produit.controller');
// Retrieve all produit
router.get('/', produitController.findAll);
// Create a new produit
router.post('/', produitController.createProd);
// Retrieve a single produit with id
router.get('/:id', produitController.findById);
// Retrieve a list of product with categorie
router.get('/byCatg/:id', produitController.findByCategorie);
// Retrieve all Featured Poroduct 
router.get('/featuredProduct/:id',produitController.featuredProd);
// Update a produit with id
router.put('/:id', produitController.update);
// Delete a produit with id
router.delete('/:id', produitController.delete);
// autentification
router.post('/login',authentication.login);
// Get user By Id
router.get('/user/:id',authentication.getUserById);
    
module.exports = router