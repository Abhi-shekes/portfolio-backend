const mongoose = require("mongoose")

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    company: {
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
    location: {
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

module.exports = mongoose.model("Internship", internshipSchema)
