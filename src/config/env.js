// import dotenv from 'dotenv';
// dotenv.config();

// const env = {
//   PORT: process.env.PORT || 5000,

//   DATABASE_URL: process.env.DATABASE_URL,

//   JWT_SECRET: process.env.JWT_SECRET,

//   GEMINI_API_KEY: process.env.GEMINI_API_KEY,

//   TWILIO_ACCOUNT_SID:
//     process.env.TWILIO_ACCOUNT_SID,

//   TWILIO_AUTH_TOKEN:
//     process.env.TWILIO_AUTH_TOKEN,

//   TWILIO_WHATSAPP_NUMBER:
//     process.env.TWILIO_WHATSAPP_NUMBER,
// };

// export default env;


import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  TWILIO_ACCOUNT_SID:
    process.env.TWILIO_ACCOUNT_SID,

  TWILIO_AUTH_TOKEN:
    process.env.TWILIO_AUTH_TOKEN,

  TWILIO_WHATSAPP_NUMBER:
    process.env.TWILIO_WHATSAPP_NUMBER,

  LEAD_MANAGER_WHATSAPP:        // ← was missing
    process.env.LEAD_MANAGER_WHATSAPP,

  REDIS_URL: process.env.REDIS_URL,
};

export default env;