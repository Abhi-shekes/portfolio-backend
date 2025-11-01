const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { validateImageData } = require("../middleware/imageMiddleware")
const Slider = require("../models/Slider")

const router = express.Router()

// Get slider data (public)
router.get("/", async (req, res) => {
  try {
    let slider = await Slider.findOne()
    
    // If no slider exists, create a default one
    if (!slider) {
      slider = new Slider({ 
        images: [], 
        isEnabled: false 
      })
      await slider.save()
    }

    // Return consistent response format
    res.json({
      success: true,
      images: slider.images || [],
      isEnabled: slider.isEnabled || false,
      message: "Slider data fetched successfully"
    })
  } catch (error) {
    console.error("Get slider error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching slider data",
      images: [],
      isEnabled: false 
    })
  }
})

// Add image to slider (admin only)
router.post("/add-image", authMiddleware, validateImageData, async (req, res) => {
  try {
    const { url, title, description } = req.body

    // Validate required fields
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required"
      })
    }

    let slider = await Slider.findOne()
    if (!slider) {
      // Create new slider if doesn't exist
      slider = new Slider({ 
        images: [], 
        isEnabled: false 
      })
    }

    const newImage = {
      url,
      title: title || "",
      description: description || "",
      order: slider.images.length,
      createdAt: new Date()
    }

    slider.images.push(newImage)
    await slider.save()

    // Return the updated slider
    res.json({
      success: true,
      images: slider.images,
      isEnabled: slider.isEnabled,
      message: "Image added to slider successfully"
    })
  } catch (error) {
    console.error("Add image error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while adding image to slider",
      images: [],
      isEnabled: false 
    })
  }
})

// Delete image from slider (admin only)
router.delete("/delete-image/:imageId", authMiddleware, async (req, res) => {
  try {
    const { imageId } = req.params

    if (!imageId) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required"
      })
    }

    const slider = await Slider.findOne()
    if (!slider) {
      return res.status(404).json({ 
        success: false,
        message: "Slider not found",
        images: [],
        isEnabled: false 
      })
    }

    // Check if image exists
    const imageExists = slider.images.some(img => img._id.toString() === imageId)
    if (!imageExists) {
      return res.status(404).json({
        success: false,
        message: "Image not found in slider"
      })
    }

    // Remove the image
    slider.images = slider.images.filter((img) => img._id.toString() !== imageId)
    
    // Reorder remaining images
    slider.images.forEach((img, index) => {
      img.order = index
    })

    await slider.save()

    res.json({
      success: true,
      images: slider.images,
      isEnabled: slider.isEnabled,
      message: "Image deleted successfully"
    })
  } catch (error) {
    console.error("Delete image error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while deleting image from slider",
      images: [],
      isEnabled: false 
    })
  }
})

// Update slider enable/disable (admin only)
router.post("/toggle", authMiddleware, async (req, res) => {
  try {
    let slider = await Slider.findOne()
    
    if (!slider) {
      // Create new slider if doesn't exist
      slider = new Slider({ 
        images: [], 
        isEnabled: true // Default to enabled when toggling for the first time
      })
    } else {
      // Toggle existing slider
      slider.isEnabled = !slider.isEnabled
    }

    await slider.save()

    res.json({
      success: true,
      images: slider.images,
      isEnabled: slider.isEnabled,
      message: slider.isEnabled ? "Slider enabled successfully" : "Slider disabled successfully"
    })
  } catch (error) {
    console.error("Toggle slider error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while toggling slider",
      isEnabled: false 
    })
  }
})

// Reorder images (admin only)
router.post("/reorder", authMiddleware, async (req, res) => {
  try {
    const { imageIds } = req.body

    if (!imageIds || !Array.isArray(imageIds)) {
      return res.status(400).json({
        success: false,
        message: "imageIds array is required"
      })
    }

    const slider = await Slider.findOne()
    if (!slider) {
      return res.status(404).json({ 
        success: false,
        message: "Slider not found",
        images: [],
        isEnabled: false 
      })
    }

    // Create a map of existing images for quick lookup
    const imageMap = new Map()
    slider.images.forEach(img => {
      imageMap.set(img._id.toString(), img)
    })

    // Rebuild images array in the new order
    const reorderedImages = []
    
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i]
      const img = imageMap.get(imageId)
      
      if (img) {
        // Update order and push to new array
        img.order = i
        reorderedImages.push(img)
      }
    }

    // Update slider with reordered images
    slider.images = reorderedImages
    await slider.save()

    res.json({
      success: true,
      images: slider.images,
      isEnabled: slider.isEnabled,
      message: "Images reordered successfully"
    })
  } catch (error) {
    console.error("Reorder images error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while reordering images",
      images: [],
      isEnabled: false 
    })
  }
})

// Update individual image (admin only)
router.put("/update-image/:imageId", authMiddleware, async (req, res) => {
  try {
    const { imageId } = req.params
    const { url, title, description } = req.body

    if (!imageId) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required"
      })
    }

    const slider = await Slider.findOne()
    if (!slider) {
      return res.status(404).json({ 
        success: false,
        message: "Slider not found"
      })
    }

    // Find and update the image
    const imageIndex = slider.images.findIndex(img => img._id.toString() === imageId)
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in slider"
      })
    }

    // Update image properties
    if (url) slider.images[imageIndex].url = url
    if (title !== undefined) slider.images[imageIndex].title = title
    if (description !== undefined) slider.images[imageIndex].description = description
    slider.images[imageIndex].updatedAt = new Date()

    await slider.save()

    res.json({
      success: true,
      images: slider.images,
      isEnabled: slider.isEnabled,
      message: "Image updated successfully"
    })
  } catch (error) {
    console.error("Update image error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while updating image"
    })
  }
})

// Get slider status only (public)
router.get("/status", async (req, res) => {
  try {
    const slider = await Slider.findOne()
    
    res.json({
      success: true,
      isEnabled: slider ? slider.isEnabled : false,
      imageCount: slider ? slider.images.length : 0
    })
  } catch (error) {
    console.error("Get slider status error:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching slider status",
      isEnabled: false 
    })
  }
})

module.exports = router