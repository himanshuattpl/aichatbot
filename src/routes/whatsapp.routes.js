import express from "express";

import {
  webhook
}
from "../controllers/whatsapp.controller.js";

const whatsapprouter = express.Router();

whatsapprouter.post(
  "/webhook",
  webhook
);

export default whatsapprouter;