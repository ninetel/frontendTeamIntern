const mongoose = require("mongoose");
const Prompt = require("../models/Prompt"); // Adjust the path as necessary
require("dotenv").config();

const promptData = [
  {
    createdDate: new Date(),
    status: "pending",
    promptTitle: "Complete your profile",
    promptDescription: "Please complete your profile to access all features.",
  },
  {
    createdDate: new Date(),
    status: "approved",
    promptTitle: "Verify your email",
    promptDescription: "Please verify your email to secure your account.",
  },
  {
    createdDate: new Date(),
    status: "rejected",
    promptTitle: "Upgrade your plan",
    promptDescription:
      "Upgrade to a premium plan to enjoy additional benefits.",
  },
];

const seedPrompts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Delete existing prompts to avoid duplicates
    await Prompt.deleteMany({});

    // Insert new prompt data
    for (const prompt of promptData) {
      const newPrompt = new Prompt(prompt);
      await newPrompt.save();
    }

    console.log("Prompts seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding prompts:", error);
    mongoose.disconnect();
  }
};

seedPrompts();
