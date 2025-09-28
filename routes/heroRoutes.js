const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { validateImageData } = require("../middleware/imageMiddleware")
const Hero = require("../models/Hero")

const router = express.Router()

// Get hero data (public)
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne()
    res.json(hero)
  } catch (error) {
    console.error("Get hero error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create/Update hero data (admin only)
router.post("/", authMiddleware, validateImageData, async (req, res) => {
  try {
    const heroData = req.body

    let hero = await Hero.findOne()
    if (hero) {
      hero = await Hero.findOneAndUpdate({}, heroData, { new: true })
    } else {
      hero = new Hero(heroData)
      await hero.save()
    }

    res.json(hero)
  } catch (error) {
    console.error("Create/Update hero error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
