import { body } from "express-validator";
import { MATCH_STATUS } from "../../../constants/model.constant.js";

export const createMatchValidator = [
  body("seriesId")
    .notEmpty()
    .withMessage("Series ID is required"),

  body("team1")
    .notEmpty()
    .withMessage("Team 1 is required"),

  body("team2")
    .notEmpty()
    .withMessage("Team 2 is required"),

  body("venue")
    .notEmpty()
    .withMessage("Venue is required"),

  body("startTime")
    .isISO8601()
    .withMessage("Valid start time is required"),
];


export const updateMatchValidator = [
  body("venue")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Venue cannot be empty"),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Invalid start time"),

  body("status")
    .optional()
    .isIn(Object.values(MATCH_STATUS))
    .withMessage("Invalid match status"),
];

export const playingXIValidator = [
  body("team1")
    .optional()
    .isArray()
    .withMessage("Team1 must be an array"),

  body("team2")
    .optional()
    .isArray()
    .withMessage("Team2 must be an array"),
];