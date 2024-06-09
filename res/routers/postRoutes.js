// // routers/postRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createPost } = require("../controllers/postController");
// const upload = require("../middleware/uploadMiddleware");

// // Route to create a new post
// router.post("/", upload.single("image"), createPost);



// module.exports = router;

const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/postController");
const upload = require("../middleware/uploadMiddleware");
const likeRoutes = require("./likeRoutes"); // Import likeRoutes correctly

// Route to create a new post
router.post("/", upload.single("image"), createPost);

// Include like routes
router.use(likeRoutes); // Use likeRoutes without specifying a base path

module.exports = router;
