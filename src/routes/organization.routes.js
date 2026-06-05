import express
  from "express";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization.controller.js";

const router =
  express.Router();



router.post(
  "/",
  createOrganization
);

router.get(
  "/",
  getOrganizations
);

router.get(
  "/:id",
  getOrganization
);

router.patch(
  "/:id",
  updateOrganization
);

router.delete(
  "/:id",
  deleteOrganization
);

export default router;