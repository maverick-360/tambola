const { body, query, param, validationResult } = require("express-validator");

const validateUserCreate = [
  body("name").notEmpty().isString().withMessage("Name is required."),
  body("email").notEmpty().isEmail().withMessage("Invalid email address."),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password must include numeric values, lowercase letters, uppercase letters, and symbols."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateUserLogin = [
  body("email").notEmpty().isEmail().withMessage("Invalid email address."),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password must include numeric values, lowercase letters, uppercase letters, and symbols."
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateUserUpdate = [
  body("name").isString().withMessage("Name is required."),
  body("email").isEmail().withMessage("Invalid email address."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateCreateTicket = [
  body("numTickets")
    .isInt({ min: 1, max: 15 })
    .withMessage("Must be a number between 1 to 15"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateGetAllTicket = [
  query("page")
    .notEmpty()
    .isNumeric({ min: 1 })
    .withMessage("Must be a number starting from 1"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const validateParamId = [
  param("id").notEmpty().withMessage("Param ID must be provided"),
];

module.exports = {
  validateUserCreate,
  validateUserLogin,
  validateUserUpdate,
  validateCreateTicket,
  validateGetAllTicket,
  validateParamId,
};
