const mongoose = require("mongoose")

const testScoreSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    maxScore: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("TestScore", testScoreSchema)
