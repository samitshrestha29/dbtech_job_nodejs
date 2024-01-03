const { timeStamp } = require("console");
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: String, required: true },
    period: { type: String, required: true },
    contract: { type: String, required: true },
    requirements: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Job ", JobSchema);
