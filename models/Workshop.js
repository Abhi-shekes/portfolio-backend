const mongoose = require("mongoose")

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["attended", "conducted"],
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    duration: {
      type: String,
    },
    certificate: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Workshop", workshopSchema)
