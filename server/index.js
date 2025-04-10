const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser())

// const dbConnect = require('./config/database');
// dbConnect();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});

const authRoute = require('./routes/auth.routes');
const registerRoute = require("./routes/register.routes");
const listingRoute = require("./routes/listing.routes");
const projectRoute = require("./routes/project.routes");
const chatRoutes = require("./routes/chat.routes"); // Import route

app.use("/api/auth", authRoute)
app.use("/api", registerRoute)
app.use("/api", listingRoute)
app.use("/api", projectRoute)

app.use("/api", chatRoutes); // Use route

module.exports = app;

// app.listen(4000, ()=>{
//     console.log("Listening to 4000!")
// })