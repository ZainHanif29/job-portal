import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getApplyJob,
  updatedStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplyJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").get(isAuthenticated, updatedStatus);

export default router;
