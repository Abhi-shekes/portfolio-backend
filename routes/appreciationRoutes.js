const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Appreciation = require("../models/Appreciation")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const appreciations = await Appreciation.find().sort({ date: -1 })
    res.json(appreciations)
  } catch (error) {
    console.error("Get appreciations error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const appreciation = new Appreciation(req.body)
    await appreciation.save()
    res.status(201).json(appreciation)
  } catch (error) {
    console.error("Create appreciation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const appreciation = await Appreciation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!appreciation) {
      return res.status(404).json({ message: "Appreciation not found" })
    }
    res.json(appreciation)
  } catch (error) {
    console.error("Update appreciation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const appreciation = await Appreciation.findByIdAndDelete(req.params.id)
    if (!appreciation) {
      return res.status(404).json({ message: "Appreciation not found" })
    }
    res.json({ message: "Appreciation deleted successfully" })
  } catch (error) {
    console.error("Delete appreciation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
