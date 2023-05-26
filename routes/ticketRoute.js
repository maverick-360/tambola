const express = require("express");
const {
  createTicket,
  getAllTickets,
  deleteSingleTicket,
  getSingleTicket,
} = require("../controllers/ticketCtrl");
const authMiddleware = require("../middleware/auth");
const {
  validateCreateTicket,
  validateGetAllTicket,
  validateParamId,
} = require("../middleware/validator");
const ticketRouter = express.Router();

ticketRouter.post(
  "/create",
  validateCreateTicket,
  authMiddleware,
  createTicket
);
ticketRouter.get("/all", validateGetAllTicket, authMiddleware, getAllTickets);
ticketRouter.get(
  "/single/:id",
  validateParamId,
  authMiddleware,
  getSingleTicket
);
ticketRouter.delete(
  "/single/:id",
  validateParamId,
  authMiddleware,
  deleteSingleTicket
);

module.exports = ticketRouter;
