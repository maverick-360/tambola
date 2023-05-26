const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    ticketNo: {
      type: Number,
      required: [true, "Ticket numbers cannot be blank"],
    },
    ticket: {
      type: Schema.Types.Array,
      required: [true, "Ticket cannot be blank"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);
module.exports = Ticket;
