const Section = require("../models/Section")

// Get all sections
const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().sort({ displayOrder: 1 })
    res.json(sections)
  } catch (error) {
    console.error("Get all sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get enabled sections only
const getEnabledSections = async (req, res) => {
  try {
    const sections = await Section.find({ isEnabled: true }).sort({ displayOrder: 1 })
    res.json(sections)
  } catch (error) {
    console.error("Get enabled sections error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Update section
const updateSection = async (req, res) => {
  try {
    const { name } = req.params
    const { isEnabled, displayOrder } = req.body

    const section = await Section.findOneAndUpdate({ name }, { isEnabled, displayOrder }, { new: true, upsert: true })

    res.json(section)
  } catch (error) {
    console.error("Update section error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Toggle section
const toggleSection = async (req, res) => {
  try {
    const { name } = req.params

    const section = await Section.findOne({ name })
    if (!section) {
      return res.status(404).json({ message: "Section not found" })
    }

    section.isEnabled = !section.isEnabled
    await section.save()

    res.json(section)
  } catch (error) {
    console.error("Toggle section error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  getAllSections,
  getEnabledSections,
  updateSection,
  toggleSection,
}
