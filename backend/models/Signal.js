const mongoose = require("mongoose");
const signalSchema = new mongoose.Schema({
  createdDate: { type: Date, required: true, default: Date.now() },
  signalTitle: { type: String, required: true },
  signalPlans: { type: Array, required: true },
  sector: { type: String, required: true },
  scrips: { type: String, required: true },
  signalType: { type: String, required: true },
  suitableFor: { type: String, required: true },
  openPrice: { type: String, required: true },
  stopLoss: { type: String, required: true },
  buyRange1: { type: String },
  buyRange2: { type: String },
  buyRange3: { type: String },
  bookProfit1: { type: String },
  bookProfit2: { type: String },
  bookProfit3: { type: String },
  timeFrame: { type: String, required: true },
  signalImage: { type: [String], required: true },// Store multiple image URLs
  signalDescription: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Signal", signalSchema);
