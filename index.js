const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const path = require("path");
const url = require("url");
const helmet = require("helmet")
const morgan = require("morgan")
const fileURLToPath = url.fileURLToPath;


// importing routes
const projectRoutes = require("./src/routes/projectsRoutes.js")
const ContactRoute = require("./src/routes/contactRoutes.js")
const GetInTouchRoute = require("./src/routes/GetInTouch.js")
const CareerRoute = require("./src/routes/CareerRoute.js")
const employeeRoutes = require("./src/routes/employe.js")
const helpDeskRoutes = require("./src/routes/helpdesk.js")
const teamRoutes = require("./src/routes/teams.js")
const headquarteraddress = require("./src/routes/headquarter.js")
const HeadquarterAddress = require("./src/models/HeadquarterAddress.js");





// error handler
const { errorHandler } = require("./src/middleware/errorMiddleware.js");

// middlewares
dotenv.config();
app.use(helmet())
app.use(morgan("combined"))
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "/uploads")))
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
app.use(express.urlencoded({ extended: true }));








//routes section
const versionOne = (routeName) => {
  return `/api/v1/${routeName}`
}
app.use(versionOne("projects"), projectRoutes)
app.use(versionOne("employe"), employeeRoutes)
app.use(versionOne("employe"), employeeRoutes)
app.use(versionOne("team"), teamRoutes)
app.use(versionOne("touch"), GetInTouchRoute);
app.use(versionOne("helpdesk"), helpDeskRoutes)
app.use(versionOne("headqaurter"), headquarteraddress)
app.use(versionOne("contact"), ContactRoute)
app.use(versionOne("career"), CareerRoute)




// mongodb connection
app.listen(process.env.PORT, async () => {
  try {
    await db.connection;
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
