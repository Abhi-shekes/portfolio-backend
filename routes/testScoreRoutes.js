const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const TestScore = require("../models/TestScore")

const router = express.Router()

// Get all test scores (public)
router.get("/", async (req, res) => {
  try {
    const testScores = await TestScore.find().sort({ date: -1 })
    res.json(testScores)
  } catch (error) {
    console.error("Get test scores error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create test score (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const testScore = new TestScore(req.body)
    await testScore.save()
    res.status(201).json(testScore)
  } catch (error) {
    console.error("Create test score error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update test score (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const testScore = await TestScore.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!testScore) {
      return res.status(404).json({ message: "Test score not found" })
    }
    res.json(testScore)
  } catch (error) {
    console.error("Update test score error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete test score (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const testScore = await TestScore.findByIdAndDelete(req.params.id)
    if (!testScore) {
      return res.status(404).json({ message: "Test score not found" })
    }
    res.json({ message: "Test score deleted successfully" })
  } catch (error) {
    console.error("Delete test score error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
