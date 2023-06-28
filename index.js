
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");


const url = require("url");
const fileURLToPath = url.fileURLToPath;











// middlewares

dotenv.config();

const { errorHandler } = require("./src/middleware/errorMiddleware.js")

const path = require('path');

app.use(express.json())

app.use(express.json());
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








// importing routes
const ContactRoute = require("./src/routes/contactRoutes.js")
const CareerRoute = require("./src/routes/CareerRoute.js")
const ProjectRoutes = require("./src/routes/projectsRoutes.js")
const address = require('./src/routes/headquarter.js')
const teams = require('./src/routes/teams.js')
const help = require('./src/routes/helpdesk.js')
const employee = require("./src/routes/employe.js")








// routes section


const versionOne = (routeName) => `/api/v1/${routeName}`

app.use(versionOne('address'), address)
app.use(versionOne('teams'), teams)
app.use(versionOne('helpdesk'), help)
app.use(versionOne('employee'), employee)



app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", ContactRoute);
app.use("/api/v1", CareerRoute);
app.use("/api/v1", ProjectRoutes);



// db connection

app.listen(process.env.PORT, async () => {
  try {
    await db.connection
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
