const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Publication = require("../models/Publication")

const router = express.Router()

// Get all publications (public)
router.get("/", async (req, res) => {
  try {
    const publications = await Publication.find().sort({ publishDate: -1 })
    res.json(publications)
  } catch (error) {
    console.error("Get publications error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create publication (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const publication = new Publication(req.body)
    await publication.save()
    res.status(201).json(publication)
  } catch (error) {
    console.error("Create publication error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update publication (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" })
    }
    res.json(publication)
  } catch (error) {
    console.error("Update publication error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete publication (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id)
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" })
    }
    res.json({ message: "Publication deleted successfully" })
  } catch (error) {
    console.error("Delete publication error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
