const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: {
    type: String,
    default: "user",
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hasAnsweredQuestions: { type: Boolean, default: false },
  responses: {
    age: { type: String, default: null },
    occupation: { type: String, default: null },
    monthlyIncome: { type: String, default: null },
    monthlyExpenses: { type: String, default: null },
    marketExperience: { type: String, default: null },
    investmentProfile: { type: String, default: null },
    portfolioSize: { type: String, default: null },
    investmentGoal: { type: String, default: null },
    knowledgeSource: { type: [String], default: null },
    tradingSource: { type: String, default: null },
    follow: { type: [String], default: null },
    idol: { type: String, default: null },
    primaryGoal: { type: [String], default: null },
    investmentHorizon: { type: String, default: null },
    portfolioReview: { type: String, default: null },
    timeSpent: { type: String, default: null },
    currentHoldings: { type: [String], default: null },
    sectorPreferences: { type: [String], default: null },
    sectorAvoid: { type: String, default: null },
    investmentRestrictions: { type: String, default: null },
    portfolioAllocation: {
      swingTrading: { type: String, default: null },
      positionalShort: { type: String, default: null },
      longPositions: { type: String, default: null },
      investment: { type: String, default: null },
      emergencyFund: { type: String, default: null },
    },
    specificScrips: { type: String, default: null },
    investmentStrategy: { type: String, default: null },
    recommendations: { type: [String], default: null },
    updateFrequency: { type: String, default: null },
    advisoryPreference: { type: String, default: null },
    existingInvestments: { type: String, default: null },
    incorporateInvestments: { type: String, default: null },
    specificGoals: { type: String, default: null },
    additionalNotes: { type: String, default: null },
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
