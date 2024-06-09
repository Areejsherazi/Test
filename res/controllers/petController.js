

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/userInfo");

const addPetToPetOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const newPet = req.body;

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists and is a pet owner
    if (!user || user.role !== "petowner") {
      return res.status(404).json({ message: "Pet owner not found" });
    }

    // Add a new pet with a unique _id
    user.petownerInfo.petDetails.push({ ...newPet, _id: new mongoose.Types.ObjectId() });

    // Save the updated user document
    await user.save();

    res.status(201).json({
      message: "Pet added successfully",
      petDetails: user.petownerInfo.petDetails,
    });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addPetToPetOwner,
};



