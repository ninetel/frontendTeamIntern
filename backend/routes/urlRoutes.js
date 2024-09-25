const express = require("express");
const Url = require("../models/URL"); // Adjust the path to your URL model

const router = express.Router();

// Get all URLs
router.get("/", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/allowed-origins', async (req, res) => {
    try {
      const urls = await Url.find({}, 'url'); // Fetch all URLs, only return the 'url' field
      const origins = urls.map(urlObj => urlObj.url);
      res.json(origins);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch allowed origins' });
    }
  });
// Add a new URL
router.post("/", async (req, res) => {
  try {
    const newUrl = new Url(req.body);
    await newUrl.save();
    res.json(newUrl);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing URL
router.put("/:id", async (req, res) => {
  try {
    const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUrl);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a URL
router.delete("/:id", async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "URL deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
