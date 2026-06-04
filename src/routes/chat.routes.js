import express from "express";

import { sendMessage }
from "../controllers/chat.controller.js";

import { validate }
from "../middlewares/validate.middleware.js";

import { sendMessageSchema }
from "../validators/chat.validator.js";

const chatrouter = express.Router();

chatrouter.post(
  "/",
  validate(sendMessageSchema),
  sendMessage
);

export default chatrouter;