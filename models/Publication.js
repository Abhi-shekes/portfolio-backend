const mongoose = require("mongoose")

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: String,
      },
    ],
    journal: {
      type: String,
    },
    conference: {
      type: String,
    },
    publishDate: {
      type: Date,
    },
    doi: {
      type: String,
    },
    url: {
      type: String,
    },
    abstract: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Publication", publicationSchema)
