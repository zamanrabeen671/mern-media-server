const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const connectWithDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const reactionRouter = require('./routes/reactionRoute')
const app = express();

// initiate dotenv
dotenv.config();
// initializa port
const port = process.env.PORT || 5000;
// connect dB
connectWithDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// register route

app.use("/auth", authRoutes);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/reaction", reactionRouter);
// mongoose.set('strictPopulate', false);

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    status: "Failed",
  });
});

// root route handler

app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
