const User = require('../models/userInfo');

// Controller function to delete a specific pet
const deletePet = async (req, res) => {
  try {
    const { userId, petId } = req.params;

    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists and is a pet owner
    if (!user || user.role !== 'petowner') {
      return res.status(404).json({ message: 'Pet owner not found' });
    }

    // Find the pet index
    const petIndex = user.petownerInfo.petDetails.findIndex(pet => pet._id.toString() === petId);

    // Check if the pet exists
    if (petIndex === -1) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Remove the pet from the petDetails array
    user.petownerInfo.petDetails.splice(petIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  deletePet,
};
