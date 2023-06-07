import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connection } from "./db/db.js";
import cors from "cors";
import {router as ContactRoute} from "./src/controllers/contactController.js";

const app = express();
dotenv.config();

// import ContactRouter from "./src/controllers/contactController.js

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", ContactRoute);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
