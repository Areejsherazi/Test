const express = require('express');
const router = express.Router();
const petController = require('../controllers/getPets');
const deletePetController=require('../controllers/deletePetController')

// Route to get all pets of a specific user
router.get('/:userId/pets', petController.getPetsByUserId);
router.delete('/user/:userId/pet/:petId',deletePetController.deletePet);

module.exports = router;
