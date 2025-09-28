const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Certification = require("../models/Certification")

const router = express.Router()

// Get all certifications (public)
router.get("/", async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 })
    res.json(certifications)
  } catch (error) {
    console.error("Get certifications error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create certification (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const certification = new Certification(req.body)
    await certification.save()
    res.status(201).json(certification)
  } catch (error) {
    console.error("Create certification error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update certification (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" })
    }
    res.json(certification)
  } catch (error) {
    console.error("Update certification error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete certification (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id)
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" })
    }
    res.json({ message: "Certification deleted successfully" })
  } catch (error) {
    console.error("Delete certification error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
