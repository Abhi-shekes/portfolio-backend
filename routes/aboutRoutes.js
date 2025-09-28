const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const About = require("../models/About")

const router = express.Router()

// Get about data (public)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne()
    res.json(about)
  } catch (error) {
    console.error("Get about error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create/Update about data (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const aboutData = req.body

    let about = await About.findOne()
    if (about) {
      about = await About.findOneAndUpdate({}, aboutData, { new: true })
    } else {
      about = new About(aboutData)
      await about.save()
    }

    res.json(about)
  } catch (error) {
    console.error("Create/Update about error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
