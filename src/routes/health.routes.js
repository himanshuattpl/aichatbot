import express from "express";

import {
  healthCheck
}
from "../controllers/health.controller.js";

const healthrouter =
  express.Router();

healthrouter.get(
  "/",
  healthCheck
);

export default healthrouter;