const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  createdDate: { type: Date, required: true, default: Date.now() },
  status: { type: String, required: true },
  promptTitle: { type: String, required: true },
  promptDescription: { type: String, required: true },
});

module.exports = mongoose.model("Prompt", promptSchema);
