import express
  from "express";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";

const router =
  express.Router();



router.post(
  "/",
  createDepartment
);

router.get(
  "/",
  getDepartments
);

router.get(
  "/:id",
  getDepartment
);

router.patch(
  "/:id",
  updateDepartment
);

router.delete(
  "/:id",
  deleteDepartment
);

export default router;