const mongoose = require("mongoose")

const journalPaperSchema = new mongoose.Schema(
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
      required: true,
    },
    volume: {
      type: String,
    },
    issue: {
      type: String,
    },
    pages: {
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

module.exports = mongoose.model("JournalPaper", journalPaperSchema)
