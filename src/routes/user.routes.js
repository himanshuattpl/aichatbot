import express
  from "express";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";

const router =
  express.Router();

router.use(
  authenticate
);

router.post(
  "/",
  createUser
);

router.get(
  "/",
  getUsers
);

router.patch(
  "/:id",
  updateUser
);

router.delete(
  "/:id",
  deleteUser
);

export default router;