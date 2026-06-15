import { body } from "express-validator";
import { SERIES_STATUS } from "../../../constants/model.constant.js";

export const seriesValidator = [
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Series name is required"),

  body("shortName")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Short name is required"),

  body("season")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Season is required"),

  body("logo")
    .optional()
    .isString()
    .withMessage("Logo must be a string"),

  body("status")
    .optional()
    .isIn(Object.values(SERIES_STATUS))
    .withMessage("Invalid series status"),
];

