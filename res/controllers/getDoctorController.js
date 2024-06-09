const User = require("../models/userInfo");

// Controller function to get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, 'doctorInfo.fullName doctorInfo.specialization doctorInfo.clinicAddress');
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllDoctors,
};

