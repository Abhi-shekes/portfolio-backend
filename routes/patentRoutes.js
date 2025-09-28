const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Patent = require("../models/Patent")

const router = express.Router()

// Get all patents (public)
router.get("/", async (req, res) => {
  try {
    const patents = await Patent.find().sort({ filingDate: -1 })
    res.json(patents)
  } catch (error) {
    console.error("Get patents error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create patent (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const patent = new Patent(req.body)
    await patent.save()
    res.status(201).json(patent)
  } catch (error) {
    console.error("Create patent error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update patent (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const patent = await Patent.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!patent) {
      return res.status(404).json({ message: "Patent not found" })
    }
    res.json(patent)
  } catch (error) {
    console.error("Update patent error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete patent (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const patent = await Patent.findByIdAndDelete(req.params.id)
    if (!patent) {
      return res.status(404).json({ message: "Patent not found" })
    }
    res.json({ message: "Patent deleted successfully" })
  } catch (error) {
    console.error("Delete patent error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
