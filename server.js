const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Import routes
const authRoutes = require("./routes/authRoutes")
const sectionRoutes = require("./routes/sectionRoutes")
const heroRoutes = require("./routes/heroRoutes")
const aboutRoutes = require("./routes/aboutRoutes")
const experienceRoutes = require("./routes/experienceRoutes")
const educationRoutes = require("./routes/educationRoutes")
const skillsRoutes = require("./routes/skillsRoutes")
const projectRoutes = require("./routes/projectRoutes")
const volunteerRoutes = require("./routes/volunteerRoutes")
const publicationRoutes = require("./routes/publicationRoutes")
const patentRoutes = require("./routes/patentRoutes")
const awardRoutes = require("./routes/awardRoutes")
const testScoreRoutes = require("./routes/testScoreRoutes")
const languageRoutes = require("./routes/languageRoutes")
const certificationRoutes = require("./routes/certificationRoutes")
const courseRoutes = require("./routes/courseRoutes")
const contactRoutes = require("./routes/contactRoutes")
const talkRoutes = require("./routes/talkRoutes")
const internshipRoutes = require("./routes/internshipRoutes")
const workshopRoutes = require("./routes/workshopRoutes")
const trainingRoutes = require("./routes/trainingRoutes")
const appreciationRoutes = require("./routes/appreciationRoutes")
const journalPaperRoutes = require("./routes/journalPaperRoutes")
const researchPaperRoutes = require("./routes/researchPaperRoutes")
const conferencePaperRoutes = require("./routes/conferencePaperRoutes")
const bookChapterRoutes = require("./routes/bookChapterRoutes")
const galleryRoutes = require("./routes/galleryRoutes")
const sliderRoutes = require("./routes/sliderRoutes")
const path = require("path")


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

// Request Logger Middleware
app.use((req, res, next) => {
  console.log("----------------------------------------")
  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.originalUrl}`)

  if (Object.keys(req.query).length > 0) {
    console.log("Query Params:", req.query)
  }

  if (Object.keys(req.body).length > 0) {
    console.log("Request Body:", req.body)
  }

  console.log("----------------------------------------")
  next()
})

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/sections", sectionRoutes)
app.use("/api/hero", heroRoutes)
app.use("/api/about", aboutRoutes)
app.use("/api/experience", experienceRoutes)
app.use("/api/education", educationRoutes)
app.use("/api/skills", skillsRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/volunteer", volunteerRoutes)
app.use("/api/publications", publicationRoutes)
app.use("/api/patents", patentRoutes)
app.use("/api/awards", awardRoutes)
app.use("/api/testscores", testScoreRoutes)
app.use("/api/languages", languageRoutes)
app.use("/api/certifications", certificationRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/talks", talkRoutes)
app.use("/api/internships", internshipRoutes)
app.use("/api/workshops", workshopRoutes)
app.use("/api/trainings", trainingRoutes)
app.use("/api/appreciations", appreciationRoutes)
app.use("/api/journal-papers", journalPaperRoutes)
app.use("/api/research-papers", researchPaperRoutes)
app.use("/api/conference-papers", conferencePaperRoutes)
app.use("/api/book-chapters", bookChapterRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/slider", sliderRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Portfolio API is running!" })
})

// Serve frontend (Vite build)
app.use(express.static(path.join(__dirname, "../portfolio-frontend/dist")))

// For SPA routing, serve index.html for unknown routes except /api
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio-frontend/dist/index.html"))
})



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
