const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Volunteer = require("../models/Volunteer")

const router = express.Router()

// Get all volunteer experiences (public)
router.get("/", async (req, res) => {
  try {
    const volunteer = await Volunteer.find().sort({ startDate: -1 })
    res.json(volunteer)
  } catch (error) {
    console.error("Get volunteer error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create volunteer experience (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body)
    await volunteer.save()
    res.status(201).json(volunteer)
  } catch (error) {
    console.error("Create volunteer error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update volunteer experience (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer experience not found" })
    }
    res.json(volunteer)
  } catch (error) {
    console.error("Update volunteer error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete volunteer experience (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id)
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer experience not found" })
    }
    res.json({ message: "Volunteer experience deleted successfully" })
  } catch (error) {
    console.error("Delete volunteer error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
