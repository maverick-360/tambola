const express = require("express");
const cors = require("cors");
const { errorHandler, notFound } = require("./utils/errorHandler");
const ticketRouter = require("./routes/ticketRoute");
const Connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const compression = require("compression");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression())

Connection(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started successfully");
});
