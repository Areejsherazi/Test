const User = require('../models/userInfo');

// Controller function to get all pets of a specific user
const getPetsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists and is a pet owner
    if (!user || user.role !== 'petowner') {
      return res.status(404).json({ message: 'Pet owner not found' });
    }

    // Extract required fields from each pet
    const pets = user.petownerInfo.petDetails.map(pet => ({
      name: pet.petName,
      age: pet.age,
      breed: pet.breed,
      vaccinationDate: pet.lastVaccinationDate,
    }));

    res.status(200).json({ pets });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPetsByUserId,
};
