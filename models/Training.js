const mongoose = require("mongoose")

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    certificate: {
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

module.exports = mongoose.model("Training", trainingSchema)
