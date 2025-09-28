const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    socials: {
      linkedin: String,
      github: String,
      twitter: String,
      email: String,
      website: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Hero", heroSchema)
