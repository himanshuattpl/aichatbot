import jwt from "jsonwebtoken";

import env from "../config/env.js";

const ACCESS_TOKEN_EXPIRY = "7d";

export const generateToken = (
  payload
) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn:
        ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const verifyToken = (
  token
) => {
  return jwt.verify(
    token,
    env.JWT_SECRET
  );
};