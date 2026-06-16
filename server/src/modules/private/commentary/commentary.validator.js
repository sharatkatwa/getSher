import { body } from "express-validator";

import { COMMENTARY_TYPES } from "../../../model/commentary.model.js";

export const createCommentaryValidator = [
  body("matchId")
    .notEmpty()
    .withMessage("matchId is required.")
    .isMongoId()
    .withMessage("matchId must be a valid MongoDB id."),

  body("over")
    .notEmpty()
    .withMessage("over is required.")
    .isInt({ min: 0 })
    .withMessage("over must be 0 or greater."),

  body("ball")
    .notEmpty()
    .withMessage("ball is required.")
    .isInt({ min: 1, max: 6 })
    .withMessage("ball must be between 1 and 6."),

  body("text")
    .notEmpty()
    .withMessage("text is required.")
    .isString()
    .trim()
    .withMessage("text must be a string."),

  body("type")
    .optional()
    .isIn(Object.values(COMMENTARY_TYPES))
    .withMessage("Invalid commentary type."),
];
