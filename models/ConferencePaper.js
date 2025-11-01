const mongoose = require("mongoose")

const conferencePaperSchema = new mongoose.Schema(
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
    conference: {
      type: String,
      required: true,
    },
    conferenceDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
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
    proceedings: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("ConferencePaper", conferencePaperSchema)
