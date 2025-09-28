const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Language = require("../models/Language")

const router = express.Router()

// Get all languages (public)
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find()
    res.json(languages)
  } catch (error) {
    console.error("Get languages error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create language (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const language = new Language(req.body)
    await language.save()
    res.status(201).json(language)
  } catch (error) {
    console.error("Create language error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update language (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!language) {
      return res.status(404).json({ message: "Language not found" })
    }
    res.json(language)
  } catch (error) {
    console.error("Update language error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete language (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id)
    if (!language) {
      return res.status(404).json({ message: "Language not found" })
    }
    res.json({ message: "Language deleted successfully" })
  } catch (error) {
    console.error("Delete language error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
