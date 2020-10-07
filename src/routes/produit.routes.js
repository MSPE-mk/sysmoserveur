const express = require('express')
const router = express.Router()
const produitController =   require('../controllers/produit.controller');
// Retrieve all produit
router.get('/', produitController.findAll);
// Create a new produit
router.post('/', produitController.create);
// Retrieve a single produit with id
router.get('/:id', produitController.findById);
// Update a produit with id
router.put('/:id', produitController.update);
// Delete a produit with id
router.delete('/:id', produitController.delete);
module.exports = router