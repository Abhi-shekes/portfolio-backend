const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Training = require("../models/Training")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const trainings = await Training.find().sort({ startDate: -1 })
    res.json(trainings)
  } catch (error) {
    console.error("Get trainings error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const training = new Training(req.body)
    await training.save()
    res.status(201).json(training)
  } catch (error) {
    console.error("Create training error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!training) {
      return res.status(404).json({ message: "Training not found" })
    }
    res.json(training)
  } catch (error) {
    console.error("Update training error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id)
    if (!training) {
      return res.status(404).json({ message: "Training not found" })
    }
    res.json({ message: "Training deleted successfully" })
  } catch (error) {
    console.error("Delete training error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
