const bcrypt = require("bcryptjs");
const User = require("../models/userInfo");

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const roleInfo = JSON.parse(req.body.roleInfo);
    const uploadImage = req.file ? req.file.path : null;

    // Validate input
    if (!email || !password || !role || !uploadImage) {
      return res
        .status(400)
        .json({ message: "All fields including an image are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    // Create user object based on role
    if (role === 'shopkeeper') {
      newUser = new User({
        email,
        password: hashedPassword,
        role,
        shopkeeperInfo: { ...roleInfo, uploadImage },
      });
    } else if (role === 'doctor') {
      newUser = new User({
        email,
        password: hashedPassword,
        role,
        doctorInfo: { ...roleInfo, uploadImage },
      });
    } else if (role === 'petowner') {
      // Ensure personalInfo exists before setting uploadImage
      if (!roleInfo.personalInfo) {
        roleInfo.personalInfo = {};
      }
      roleInfo.personalInfo.uploadImage = uploadImage;
      // Include pet details for pet owners
      newUser = new User({
        email,
        password: hashedPassword,
        role,
        petownerInfo: {
          personalInfo: roleInfo.personalInfo,
          petDetails: roleInfo.petDetails // Assuming petDetails is included in roleInfo
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    console.log("newUser:", newUser); // Log the newUser object before saving

    // Save the user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
};
