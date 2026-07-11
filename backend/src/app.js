const express = require("express");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const moduleRoute = require("./routes/moduleRoute");
const lessonRoute = require("./routes/lessonRoute");
const categoryRoute = require("./routes/categoryRoute");
const enrollmentRoute = require("./routes/enrollmentRoute");
const paymentRoute = require("./routes/paymentRoute");
const studentRoute = require("./routes/studentRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const reportRoute = require("./routes/reportRoute");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

/* ================= CORS CONFIGURATION ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/* ================= HELMET SECURITY TUNING ================= */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= STATIC ASSET ROUTING ================= */
// Crucial Fix: Use "../uploads" to go up one level from the "src" directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ================= SYSTEM ROUTING ================= */
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/lessons", lessonRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/enrollments", enrollmentRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/students", studentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/reports", reportRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Skill Development API Running Successfully",
  });
});

module.exports = app;
