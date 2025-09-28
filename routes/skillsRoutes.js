const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Skills = require("../models/Skills")

const router = express.Router()

// Get all skills (public)
router.get("/", async (req, res) => {
  try {
    const skills = await Skills.find()
    res.json(skills)
  } catch (error) {
    console.error("Get skills error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create skills category (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const skills = new Skills(req.body)
    await skills.save()
    res.status(201).json(skills)
  } catch (error) {
    console.error("Create skills error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update skills category (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const skills = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!skills) {
      return res.status(404).json({ message: "Skills category not found" })
    }
    res.json(skills)
  } catch (error) {
    console.error("Update skills error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete skills category (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skills = await Skills.findByIdAndDelete(req.params.id)
    if (!skills) {
      return res.status(404).json({ message: "Skills category not found" })
    }
    res.json({ message: "Skills category deleted successfully" })
  } catch (error) {
    console.error("Delete skills error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
