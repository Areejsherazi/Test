const User = require("../models/userInfo");

const updatePetOwnerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = req.body;
    const uploadImage = req.file ? req.file.path : null;

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists and is a pet owner
    if (!user || user.role !== "petowner") {
      return res.status(404).json({ message: "Pet owner not found" });
    }

    // Update the pet owner's personal information
    const { personalInfo } = user.petownerInfo;
    if (updatedInfo.fullName) personalInfo.fullName = updatedInfo.fullName;
    if (updatedInfo.dateOfBirth) personalInfo.dateOfBirth = updatedInfo.dateOfBirth;
    if (updatedInfo.contactInformation) personalInfo.contactInformation = updatedInfo.contactInformation;
    if (uploadImage) personalInfo.uploadImage = uploadImage;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Pet owner profile updated successfully",
      petownerInfo: user.petownerInfo,
    });
  } catch (error) {
    console.error("Error updating pet owner profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updatePetOwnerProfile,
};
