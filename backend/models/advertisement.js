const mongoose = require("mongoose");

// Define a schema for the Advertisement model
const advertisementSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
