const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Section = require("../models/Section")

const router = express.Router()

// Get all sections (public)
router.get("/", async (req, res) => {
  try {
    const sections = await Section.find().sort({ displayOrder: 1 })
    res.json(sections)
  } catch (error) {
    console.error("Get sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get enabled sections only (public)
router.get("/enabled", async (req, res) => {
  try {
    const sections = await Section.find({ isEnabled: true }).sort({ displayOrder: 1 })
    res.json(sections)
  } catch (error) {
    console.error("Get enabled sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update section (admin only)
router.put("/:name", authMiddleware, async (req, res) => {
  try {
    const { name } = req.params
    const { isEnabled, displayOrder } = req.body

    const section = await Section.findOneAndUpdate({ name }, { isEnabled, displayOrder }, { new: true, upsert: true })

    res.json(section)
  } catch (error) {
    console.error("Update section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Toggle section (admin only)
router.patch("/:name/toggle", authMiddleware, async (req, res) => {
  try {
    const { name } = req.params

    const section = await Section.findOne({ name })
    if (!section) {
      return res.status(404).json({ message: "Section not found" })
    }

    section.isEnabled = !section.isEnabled
    await section.save()

    res.json(section)
  } catch (error) {
    console.error("Toggle section error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
