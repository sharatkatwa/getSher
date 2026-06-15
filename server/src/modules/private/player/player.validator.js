import { body } from "express-validator";

export const playerValidator = [
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Name is required."),

  body("imageUrl")
    .notEmpty()
    .withMessage("imageUrl is required."),

  body("role")
    .notEmpty()
    .isIn([
      "BATSMAN",
      "BOWLER",
      "ALL_ROUNDER",
      "WICKET_KEEPER",
    ])
    .withMessage("Invalid player role."),

  body("country")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Country is required."),

  body("battingStyle")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Batting style is required."),

  body("bowlingStyle")
    .optional()
    .isString()
    .trim()
    .withMessage("Bowling style must be in String."),
];