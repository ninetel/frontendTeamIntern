const mongoose = require("mongoose");
const Signal = require("../models/Signal"); // Adjust the path as necessary
require("dotenv").config();

const signalData = [
  {
    createdDate: new Date(),
    signalTitle: "Buy Signal for NBL",
    signalPlans: ["Diamound", "Gold"],
    sector: "Bank",
    scrips: "NBL",
    signalType: "Buy",
    suitableFor: "Aggresive Investor",
    openPrice: 100,
    stopLoss: 50,
    buyRange1: 100,
    buyRange2: 120,
    buyRange3: 140,
    bookProfit1: 300,
    bookProfit2: 320,
    bookProfit3: 340,
    timeFrame: "hour",
    signalImage:
      "http://res.cloudinary.com/dfh0g77dj/image/upload/v1610965282/signals/signal_image.jpg", // Replace with an actual Cloudinary URL
    signalDescription:
      "This is a buy signal for NBL stocks in the banking sector.",
    status: "pending",
  },
  {
    createdDate: new Date(),
    signalTitle: "Sell Signal for EBL",
    signalPlans: ["Silver", "Platinium"],
    sector: "Bank",
    scrips: "EBL",
    signalType: "Sell",
    suitableFor: "Passive Investor",
    openPrice: 200,
    stopLoss: 100,
    buyRange1: 180,
    buyRange2: 190,
    buyRange3: 200,
    bookProfit1: 400,
    bookProfit2: 420,
    bookProfit3: 440,
    timeFrame: "day",
    signalImage:
      "http://res.cloudinary.com/dfh0g77dj/image/upload/v1610965282/signals/signal_image2.jpg", // Replace with an actual Cloudinary URL
    signalDescription:
      "This is a sell signal for EBL stocks in the banking sector.",
    status: "active",
  },
];

const seedSignals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Delete existing users to avoid duplicates
    await Signal.deleteMany({});

    // Insert new user data
    for (const signal of signalData) {
      const newSignal = new Signal(signal);
      await newSignal.save();
    }

    console.log("Users seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding users:", error);
    mongoose.disconnect();
  }
};

seedSignals();
