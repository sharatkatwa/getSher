import { body } from "express-validator";

export const teamValidator = [
  body("name").notEmpty().isString().trim().withMessage("Name is required."),
  
  body("shortName")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("shortName is required"),
    
  body("logo").notEmpty().withMessage("logo is required."),
  
  body("primaryColor")
    .optional()
    .isString()
    .withMessage("primary color must be in String."),
    
  body("squadPlayers")
    .optional()
    .isArray({ min: 11, max: 20 })
    .withMessage(
      "squad should be an Array & can contain min:11,max:20 players",
    ),
];
