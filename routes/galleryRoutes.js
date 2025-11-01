const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const GalleryImage = require("../models/GalleryImage")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ date: -1 })
    res.json(images)
  } catch (error) {
    console.error("Get gallery images error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/featured", async (req, res) => {
  try {
    const images = await GalleryImage.find({ featured: true }).sort({ date: -1 })
    res.json(images)
  } catch (error) {
    console.error("Get featured images error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", authMiddleware, async (req, res) => {
  try {
    const image = new GalleryImage(req.body)
    await image.save()
    res.status(201).json(image)
  } catch (error) {
    console.error("Create gallery image error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!image) {
      return res.status(404).json({ message: "Gallery image not found" })
    }
    res.json(image)
  } catch (error) {
    console.error("Update gallery image error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id)
    if (!image) {
      return res.status(404).json({ message: "Gallery image not found" })
    }
    res.json({ message: "Gallery image deleted successfully" })
  } catch (error) {
    console.error("Delete gallery image error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
