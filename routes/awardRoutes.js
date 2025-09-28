const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Award = require("../models/Award")

const router = express.Router()

// Get all awards (public)
router.get("/", async (req, res) => {
  try {
    const awards = await Award.find().sort({ date: -1 })
    res.json(awards)
  } catch (error) {
    console.error("Get awards error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create award (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const award = new Award(req.body)
    await award.save()
    res.status(201).json(award)
  } catch (error) {
    console.error("Create award error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update award (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!award) {
      return res.status(404).json({ message: "Award not found" })
    }
    res.json(award)
  } catch (error) {
    console.error("Update award error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete award (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id)
    if (!award) {
      return res.status(404).json({ message: "Award not found" })
    }
    res.json({ message: "Award deleted successfully" })
  } catch (error) {
    console.error("Delete award error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
