const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const JournalPaper = require("../models/JournalPaper")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const papers = await JournalPaper.find().sort({ publishDate: -1 })
    res.json(papers)
  } catch (error) {
    console.error("Get journal papers error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const paper = new JournalPaper(req.body)
    await paper.save()
    res.status(201).json(paper)
  } catch (error) {
    console.error("Create journal paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await JournalPaper.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!paper) {
      return res.status(404).json({ message: "Journal paper not found" })
    }
    res.json(paper)
  } catch (error) {
    console.error("Update journal paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await JournalPaper.findByIdAndDelete(req.params.id)
    if (!paper) {
      return res.status(404).json({ message: "Journal paper not found" })
    }
    res.json({ message: "Journal paper deleted successfully" })
  } catch (error) {
    console.error("Delete journal paper error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
