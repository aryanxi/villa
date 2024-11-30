const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  phone: { type: String, required: true },
  billAmount: { type: Number, required: true }, // Billing amount
  billDate: { type: Date, default: Date.now }, // Billing date
});

module.exports = mongoose.model("customers", CustomerSchema);
