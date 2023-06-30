const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const ContactRoute = require("./src/routes/contactRoutes.js")
const CareerRoute = require("./src/routes/CareerRoute.js")
const path = require("path");
const url = require("url");
const fileURLToPath = url.fileURLToPath;


dotenv.config();

const { errorHandler } = require("./src/middleware/errorMiddleware.js")

app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "/uploads"))); // app.use(bodyParser.json());
app.use(errorHandler)

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    // credentials: true,
    maxAge: 600,
    exposedHeaders: ["*", "Authorization"],
  })
);
console.log(__dirname);
app.use("/public", express.static(path.join(__dirname, "/uploads"))); // app.use(bodyParser.json());
// app.use("/public", express.static(`${__dirnamedirname}/uploads`)); // app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", ContactRoute);
app.use("/api/v1", CareerRoute);
app.listen(process.env.PORT, async () => {
  try {
    await db.connection;
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
