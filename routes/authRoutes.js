const express = require("express")
const { register, login, getCurrentUser, changePassword } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// Public routes
router.post("/register", register)
router.post("/login", login)

// Protected routes
router.get("/me", authMiddleware, getCurrentUser)
router.put("/change-password", authMiddleware, changePassword)

module.exports = router
