const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const BookChapter = require("../models/BookChapter")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const chapters = await BookChapter.find().sort({ publishDate: -1 })
    res.json(chapters)
  } catch (error) {
    console.error("Get book chapters error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const chapter = new BookChapter(req.body)
    await chapter.save()
    res.status(201).json(chapter)
  } catch (error) {
    console.error("Create book chapter error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const chapter = await BookChapter.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!chapter) {
      return res.status(404).json({ message: "Book chapter not found" })
    }
    res.json(chapter)
  } catch (error) {
    console.error("Update book chapter error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const chapter = await BookChapter.findByIdAndDelete(req.params.id)
    if (!chapter) {
      return res.status(404).json({ message: "Book chapter not found" })
    }
    res.json({ message: "Book chapter deleted successfully" })
  } catch (error) {
    console.error("Delete book chapter error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
