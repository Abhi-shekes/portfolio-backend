const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Workshop = require("../models/Workshop")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: -1 })
    res.json(workshops)
  } catch (error) {
    console.error("Get workshops error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/attended", async (req, res) => {
  try {
    const workshops = await Workshop.find({ type: "attended" }).sort({ date: -1 })
    res.json(workshops)
  } catch (error) {
    console.error("Get attended workshops error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/conducted", async (req, res) => {
  try {
    const workshops = await Workshop.find({ type: "conducted" }).sort({ date: -1 })
    res.json(workshops)
  } catch (error) {
    console.error("Get conducted workshops error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const workshop = new Workshop(req.body)
    await workshop.save()
    res.status(201).json(workshop)
  } catch (error) {
    console.error("Create workshop error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" })
    }
    res.json(workshop)
  } catch (error) {
    console.error("Update workshop error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id)
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" })
    }
    res.json({ message: "Workshop deleted successfully" })
  } catch (error) {
    console.error("Delete workshop error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
