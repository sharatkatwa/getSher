import express from "express";

import CommentaryController from "./commentary.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const commentaryController = new CommentaryController();

router.get(
  "/match/:matchId",
  asyncHandler(commentaryController.getCommentaryByMatch.bind(commentaryController)),
);

export default router;
