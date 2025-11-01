const mongoose = require("mongoose")

const bookChapterSchema = new mongoose.Schema(
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
    bookTitle: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    chapterNumber: {
      type: String,
    },
    pages: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    isbn: {
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
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("BookChapter", bookChapterSchema)
