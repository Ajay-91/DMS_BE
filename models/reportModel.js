const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,

  },
  location: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Active"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reportModel = mongoose.model("reports", reportSchema);

module.exports = reportModel;
