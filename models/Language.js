const mongoose = require("mongoose")

const languageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },
    proficiency: {
      type: String,
      enum: ["Elementary", "Limited Working", "Professional Working", "Full Professional", "Native"],
      required: true,
    },
    certifications: [
      {
        name: String,
        score: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Language", languageSchema)
