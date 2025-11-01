const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Talk = require("../models/Talk")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const talks = await Talk.find().sort({ date: -1 })
    res.json(talks)
  } catch (error) {
    console.error("Get talks error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const talk = new Talk(req.body)
    await talk.save()
    res.status(201).json(talk)
  } catch (error) {
    console.error("Create talk error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const talk = await Talk.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!talk) {
      return res.status(404).json({ message: "Talk not found" })
    }
    res.json(talk)
  } catch (error) {
    console.error("Update talk error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const talk = await Talk.findByIdAndDelete(req.params.id)
    if (!talk) {
      return res.status(404).json({ message: "Talk not found" })
    }
    res.json({ message: "Talk deleted successfully" })
  } catch (error) {
    console.error("Delete talk error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
