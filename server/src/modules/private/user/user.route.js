import express from "express";

import UserController from "./user.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();
const userController = new UserController();

router.get(
  "/",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN"]),
  asyncHandler(userController.getUsers.bind(userController)),
);

router.get(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN"]),
  asyncHandler(userController.getUserById.bind(userController)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN"]),
  asyncHandler(userController.updateUser.bind(userController)),
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN"]),
  asyncHandler(userController.deleteUser.bind(userController)),
);

export default router;
