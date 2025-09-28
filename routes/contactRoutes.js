const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Contact = require("../models/Contact")

const router = express.Router()

// Submit contact form (public)
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    res.status(201).json({ message: "Message sent successfully" })
  } catch (error) {
    console.error("Submit contact error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all contact messages (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    console.error("Get contacts error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Mark message as read (admin only)
router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!contact) {
      return res.status(404).json({ message: "Message not found" })
    }
    res.json(contact)
  } catch (error) {
    console.error("Mark as read error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete contact message (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: "Message not found" })
    }
    res.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Delete contact error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
