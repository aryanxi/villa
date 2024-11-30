const twilio = require("twilio");
require("dotenv").config();

console.log("TWILIO_SID:", process.env.TWILIO_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: "Hello from Twilio!",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: "whatsapp:+919022620311", // Replace <target_phone_number> with a valid phone number
  })
  .then((message) => console.log("Message sent:", message.sid))
  .catch((error) => console.error("Error:", error));
