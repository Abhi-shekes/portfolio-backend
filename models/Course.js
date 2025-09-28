const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    certificateUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Course", courseSchema)
