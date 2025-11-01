const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const ConferencePaper = require("../models/ConferencePaper")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const papers = await ConferencePaper.find().sort({ conferenceDate: -1 })
    res.json(papers)
  } catch (error) {
    console.error("Get conference papers error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const paper = new ConferencePaper(req.body)
    await paper.save()
    res.status(201).json(paper)
  } catch (error) {
    console.error("Create conference paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await ConferencePaper.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!paper) {
      return res.status(404).json({ message: "Conference paper not found" })
    }
    res.json(paper)
  } catch (error) {
    console.error("Update conference paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await ConferencePaper.findByIdAndDelete(req.params.id)
    if (!paper) {
      return res.status(404).json({ message: "Conference paper not found" })
    }
    res.json({ message: "Conference paper deleted successfully" })
  } catch (error) {
    console.error("Delete conference paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
