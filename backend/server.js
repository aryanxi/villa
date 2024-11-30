require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const moment = require("moment"); // For easier date manipulation
const Customer = require("./models/Customer"); // Adjust path if necessary
const { sendWhatsAppMessage } = require("./utils/twilio"); // Adjust path if necessary

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
console.log("MongoDB URI:", MONGO_URI); // Debugging log

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const customersRoute = require("./routes/customers");
const advertisementsRoute = require("./routes/advertisements");

app.use("/customers", customersRoute);
app.use("/advertisements", advertisementsRoute);

// Daily scheduler for sending WhatsApp messages
cron.schedule("0 9 * * *", async () => {
  console.log("Checking for customers with upcoming birthdays...");

  try {
    // Get all customers from the database
    const customers = await Customer.find();

    const today = moment(); // Get today's date
    const twoDaysFromNow = today.add(2, "days"); // Add 2 days to today's date

    customers.forEach((customer) => {
      const birthdate = moment(customer.birthdate); // Convert customer's birthdate to moment object

      // If the customer's birthday is in 2 days
      if (
        birthdate.isSame(twoDaysFromNow, "day") &&
        customer.phone // Ensure the customer has a phone number
      ) {
        const message = `🎉 Hi ${customer.name}! Your birthday is in 2 days! We have a special offer for you. Stay tuned for our birthday surprise! 🎁`;

        sendWhatsAppMessage(customer.phone, message); // Send WhatsApp message
        console.log(`Message sent to ${customer.name}`);
      }
    });
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});
// Fetch all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();  // Assuming you have a Customer model defined
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
