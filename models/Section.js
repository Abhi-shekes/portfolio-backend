const mongoose = require("mongoose")

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "hero",
        "about",
        "experience",
        "education",
        "skills",
        "projects",
        "volunteer",
        "publications",
        "patents",
        "awards",
        "testscores",
        "languages",
        "certifications",
        "courses",
        "contact",
        "talks",
        "internships",
        "workshops",
        "trainings",
        "appreciations",
        "journalpapers",
        "researchpapers",
        "conferencepapers",
        "bookchapters",
        "gallery",
      ],
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Section", sectionSchema)
