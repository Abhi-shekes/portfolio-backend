const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const ResearchPaper = require("../models/ResearchPaper")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const papers = await ResearchPaper.find().sort({ publishDate: -1 })
    res.json(papers)
  } catch (error) {
    console.error("Get research papers error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const paper = new ResearchPaper(req.body)
    await paper.save()
    res.status(201).json(paper)
  } catch (error) {
    console.error("Create research paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await ResearchPaper.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" })
    }
    res.json(paper)
  } catch (error) {
    console.error("Update research paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await ResearchPaper.findByIdAndDelete(req.params.id)
    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" })
    }
    res.json({ message: "Research paper deleted successfully" })
  } catch (error) {
    console.error("Delete research paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
