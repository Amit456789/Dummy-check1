
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const cors = require("cors");

const path = require("path");
const url = require("url");
const fileURLToPath = url.fileURLToPath;


dotenv.config();
const app = express();
// app.use(express.json())
app.use(express.json())
// const __filename = fileURLToPath(import.meta.url);

// const currentFilename = require.resolve(fileURLToPath(__filename));

// const dirname = path.dirname(currentFilename);
app.use(express.json());

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



// routes section
const ContactRoute = require("./src/routes/contactRoutes.js").router;
const CareerRoute = require("./src/routes/CareerRoute.js").router;
const ProjectRoutes = require("./src/routes/projectsRoutes.js").router



app.use("/public", express.static(path.join(__dirname, "/uploads"))); // app.use(bodyParser.json());
// app.use("/public", express.static(`${__dirnamedirname}/uploads`)); // app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", ContactRoute);
app.use("/api/v1", CareerRoute);
app.use("/api/v1", ProjectRoutes)
app.listen(process.env.PORT, async () => {
  try {
    await db.connection
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
