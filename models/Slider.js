const mongoose = require("mongoose")

const sliderSchema = new mongoose.Schema(
  {
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Slider", sliderSchema)
