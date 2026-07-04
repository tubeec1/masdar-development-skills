const express = require("express");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Skill Development API Running Successfully",
  });
});

module.exports = app;
