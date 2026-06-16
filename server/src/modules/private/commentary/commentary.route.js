import express from "express";

import commentaryController from "./commentary.controller.js";
import { createCommentaryValidator } from "./commentary.validator.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";
import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  createCommentaryValidator,
  validateErrors,
  asyncHandler(commentaryController.addCommentary.bind(commentaryController)),
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  asyncHandler(commentaryController.deleteCommentary.bind(commentaryController)),
);

export default router;
