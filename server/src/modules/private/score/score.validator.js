import { body } from "express-validator";

const oversPattern = /^\d+\.[0-5]$/;

export const createScoreValidator = [
  body("matchId")
    .notEmpty()
    .withMessage("matchId is required.")
    .isMongoId()
    .withMessage("matchId must be a valid MongoDB id."),

  body("innings")
    .notEmpty()
    .withMessage("innings is required.")
    .isInt({ min: 1, max: 2 })
    .withMessage("innings must be 1 or 2."),

  body("battingTeam")
    .notEmpty()
    .withMessage("battingTeam is required.")
    .isMongoId()
    .withMessage("battingTeam must be a valid MongoDB id."),

  body("score")
    .optional()
    .isInt({ min: 0 })
    .withMessage("score must be a positive number."),

  body("wickets")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("wickets must be between 0 and 10."),

  body("overs")
    .optional()
    .matches(oversPattern)
    .withMessage("overs must be in X.Y format where Y is 0-5."),

  body("runRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("runRate must be a positive number."),

  body("target")
    .optional()
    .isInt({ min: 0 })
    .withMessage("target must be a positive number."),
];

export const updateScoreValidator = [
  body("battingTeam")
    .optional()
    .isMongoId()
    .withMessage("battingTeam must be a valid MongoDB id."),

  body("score")
    .optional()
    .isInt({ min: 0 })
    .withMessage("score must be a positive number."),

  body("wickets")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("wickets must be between 0 and 10."),

  body("overs")
    .optional()
    .matches(oversPattern)
    .withMessage("overs must be in X.Y format where Y is 0-5."),

  body("runRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("runRate must be a positive number."),

  body("target")
    .optional()
    .isInt({ min: 0 })
    .withMessage("target must be a positive number."),
];
