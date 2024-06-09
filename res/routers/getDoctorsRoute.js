const express = require("express");
const { getAllDoctors } = require("../controllers/getDoctorController");

const router = express.Router();

// Route to get all doctors
router.get("/doctors", getAllDoctors);

module.exports = router;
