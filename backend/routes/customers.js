const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Add a new customer
router.post("/", async (req, res) => {
  const { name, birthdate, phone, billAmount, billDate } = req.body;
  try {
    const newCustomer = new Customer({
      name,
      birthdate,
      phone,
      billAmount,
      billDate,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
