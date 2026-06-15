import express from "express";
import SeriesController from "./series.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";
import { seriesValidator } from "./series.validator.js";
import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();

const controller = new SeriesController();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  seriesValidator,
  validateErrors,
  asyncHandler(controller.createSeries.bind(controller)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  seriesValidator,
  validateErrors,
  asyncHandler(controller.updateSeries.bind(controller)),
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  asyncHandler(controller.deleteSeries.bind(controller)),
);

export default router;
