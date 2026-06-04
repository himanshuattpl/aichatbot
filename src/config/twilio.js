import twilio from "twilio";

import env from "./env.js";

const twilioClient = twilio(
  env.TWILIO_ACCOUNT_SID,
  env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage =
  async (to, body) => {
    console.log("TWILIO FROM:",
      env.TWILIO_WHATSAPP_NUMBER);

    console.log("TWILIO TO:", to);
    return twilioClient.messages.create({
      from:
        env.TWILIO_WHATSAPP_NUMBER,

      to,

      body,
    });
  };

export default twilioClient;