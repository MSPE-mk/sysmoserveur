var path = require('path'),
    __parentDir = path.dirname(module.parent.filename);
const express = require('express')
const router = express.Router()
const produitController =   require('../controllers/produit.controller');
// Retrieve all produit
router.get('/', produitController.findAll);
// Create a new produit
router.post('/', produitController.create);
// Retrieve a single produit with id
router.get('/:id', produitController.findById);
// Retrieve a list of product with categorie
router.get('/byCatg/:id', produitController.findByCategorie);
// Update a produit with id
router.put('/:id', produitController.update);
// Delete a produit with id
router.delete('/:id', produitController.delete);
// Upload Images
router.post('/upload', produitController.upload);
    
module.exports = router