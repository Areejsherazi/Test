

const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const { updatePetOwnerProfile } = require("../controllers/petOwnerController");  // Import the function
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("uploadImage"), registerUser);
router.put("/updatePetOwnerProfile/:id", upload.single("uploadImage"), updatePetOwnerProfile);  // Use the correct method here

module.exports = router;
