const Ticket = require("../models/Ticket");
const validateMongodbId = require("../utils/validateMongoDbId");
const generateTicket = require("../utils/tambolaTicket");
const expressAsyncHandler = require("express-async-handler");

const createTicket = expressAsyncHandler(async (req, res) => {
  const { _id, tickets } = req.user;
  const { numTickets } = req.body;
  const ticketsArr = [];
  try {
    for (let i = 0; i < numTickets; i++) {
      const ticket = generateTicket();
      ticketsArr[i] = {
        ticketNo: i + 1,
        ticket,
        user: _id,
      };
    }
    const newTicket = await Ticket.insertMany(ticketsArr);
    for (let i = 0; i < numTickets; i++) {
      tickets.push(newTicket[i]._id);
    }
    req.user.save();
    res.status(201).json(newTicket);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTickets = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { page } = req.query;
  try {
    const tickets = await Ticket.find({ user: _id })
      .sort({ _id: -1 })
      .limit(5)
      .skip(5 * (page - 1));
    res.status(200).json(tickets);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleTicket = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    validateMongodbId(id);
    const ticket = await Ticket.findById(id);
    if (ticket && ticket.user.toString() !== _id.toString()) {
      throw new Error("You are not authorized to view this ticket");
    }
    res.status(200).json(ticket);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSingleTicket = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    validateMongodbId(id);
    const ticket = await Ticket.findById(id);
    if (ticket && ticket.user.toString() !== _id.toString()) {
      throw new Error("You are not authorized to delete this ticket");
    }
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    res.status(200).json(deletedTicket);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createTicket,
  getAllTickets,
  getSingleTicket,
  deleteSingleTicket,
};
