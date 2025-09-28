const mongoose = require("mongoose")

const skillsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    skills: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Intermediate",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Skills", skillsSchema)
