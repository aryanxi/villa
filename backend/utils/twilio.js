const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER, // WhatsApp-enabled Twilio number
      to: `whatsapp:${to}`, // Recipient's WhatsApp number
      body: message,
    });
    console.log("WhatsApp message sent:", response.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};

module.exports = { sendWhatsAppMessage };
