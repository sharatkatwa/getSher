import express from "express";
import matchController from "./match.controller.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";


const router = express.Router();

router.post(
  "/",
  // authenticateMiddleware,
  // authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  matchController.createMatch
);

router.put(
  "/:id",
  // authenticateMiddleware,
  // authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  matchController.updateMatch
);

router.put(
  "/:id/playing-xi",
  // authenticateMiddleware,
  // authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  matchController.updatePlayingXI
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  matchController.deleteMatch
);

export default router;
