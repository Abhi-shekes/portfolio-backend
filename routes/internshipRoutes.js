const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Internship = require("../models/Internship")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().sort({ startDate: -1 })
    res.json(internships)
  } catch (error) {
    console.error("Get internships error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const internship = new Internship(req.body)
    await internship.save()
    res.status(201).json(internship)
  } catch (error) {
    console.error("Create internship error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" })
    }
    res.json(internship)
  } catch (error) {
    console.error("Update internship error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id)
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" })
    }
    res.json({ message: "Internship deleted successfully" })
  } catch (error) {
    console.error("Delete internship error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
