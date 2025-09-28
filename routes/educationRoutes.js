const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Education = require("../models/Education")

const router = express.Router()

// Get all education (public)
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 })
    res.json(education)
  } catch (error) {
    console.error("Get education error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create education (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const education = new Education(req.body)
    await education.save()
    res.status(201).json(education)
  } catch (error) {
    console.error("Create education error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update education (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!education) {
      return res.status(404).json({ message: "Education not found" })
    }
    res.json(education)
  } catch (error) {
    console.error("Update education error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete education (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id)
    if (!education) {
      return res.status(404).json({ message: "Education not found" })
    }
    res.json({ message: "Education deleted successfully" })
  } catch (error) {
    console.error("Delete education error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
