const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const Project = require("../models/Project")

const router = express.Router()

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 })
    res.json(projects)
  } catch (error) {
    console.error("Get projects error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get featured projects (public)
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ startDate: -1 })
    res.json(projects)
  } catch (error) {
    console.error("Get featured projects error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create project (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    console.error("Create project error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update project (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    res.json(project)
  } catch (error) {
    console.error("Update project error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete project (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Delete project error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
