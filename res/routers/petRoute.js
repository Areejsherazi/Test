const express = require("express");
const { addPetToPetOwner } = require("../controllers/petController");
const router = express.Router();

router.post("/:id/addPet", addPetToPetOwner);
module.exports = router;

