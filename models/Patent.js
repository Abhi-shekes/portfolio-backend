const mongoose = require("mongoose")

const patentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    patentNumber: {
      type: String,
      required: true,
    },
    inventors: [
      {
        type: String,
      },
    ],
    assignee: {
      type: String,
    },
    filingDate: {
      type: Date,
    },
    grantDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Filed", "Pending", "Granted", "Expired"],
      default: "Filed",
    },
    description: {
      type: String,
    },
    url: {
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

module.exports = mongoose.model("Patent", patentSchema)
