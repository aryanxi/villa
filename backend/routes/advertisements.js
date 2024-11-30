const express = require("express");
const router = express.Router();
const Advertisement = require("../models/advertisement");

// Get the advertisement content
router.get("/", async (req, res) => {
  try {
    const ad = await Advertisement.findOne();
    res.json(ad);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update the advertisement content
router.put("/", async (req, res) => {
  const { content } = req.body;
  try {
    let ad = await Advertisement.findOne();
    if (ad) {
      ad.content = content;
      await ad.save();
    } else {
      ad = new Advertisement({ content });
      await ad.save();
    }
    res.json({ message: "Advertisement updated" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
