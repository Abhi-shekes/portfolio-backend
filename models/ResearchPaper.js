const mongoose = require("mongoose")

const researchPaperSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
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
    pdf: {
      type: String,
    },
    keywords: [
      {
        type: String,
      },
    ],
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

module.exports = mongoose.model("ResearchPaper", researchPaperSchema)
