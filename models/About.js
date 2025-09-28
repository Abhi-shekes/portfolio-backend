const mongoose = require("mongoose")

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "About Me",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("About", aboutSchema)
