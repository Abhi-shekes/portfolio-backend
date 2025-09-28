const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Experience = require("../models/Experience")

const router = express.Router()

// Get all experiences (public)
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 })
    res.json(experiences)
  } catch (error) {
    console.error("Get experiences error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single experience (public)
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" })
    }
    res.json(experience)
  } catch (error) {
    console.error("Get experience error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create experience (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const experience = new Experience(req.body)
    await experience.save()
    res.status(201).json(experience)
  } catch (error) {
    console.error("Create experience error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update experience (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" })
    }
    res.json(experience)
  } catch (error) {
    console.error("Update experience error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete experience (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id)
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" })
    }
    res.json({ message: "Experience deleted successfully" })
  } catch (error) {
    console.error("Delete experience error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
