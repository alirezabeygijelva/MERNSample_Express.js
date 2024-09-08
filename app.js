const Logger = require("./middelwares/logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const coursesRoute = require('./routes/courses-route')
const doctorRoute = require('./routes/doctor-route')
const homeRoute = require("./routes/home-route")
const userRoute = require("./routes/users-route");
const reserveRoute = require("./routes/reserve-route");
const visitRoute = require("./routes/visit-route");
const errorHandler = require("./middelwares/error_handler");
const connectDB= require('./utilities/mongo')
const cors = require('cors');

require("dotenv").config();

const startupDebug = require("debug")("startup")
const dbDebug = require("debug")("db")

connectDB();
const app = express();
app.use(express.json());

// CORS Middleware
app.use(cors());

// app.use(cors({
//   origin: 'http://your-frontend-domain.com', // Replace with your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   credentials: true // Allow cookies to be sent
// }));

//app.use(express.static('public'))
//app.use(Logger);
app.use(helmet());

startupDebug("hello from startup debug")
if (app.get("env") === "development") app.use(morgan("tiny"));

//   Key=value&key2=value2
app.use(express.urlencoded({ extended: true }));



app.use('/api/users' , userRoute)
app.use('/api/courses' , coursesRoute)
app.use('/api/doctores' , doctorRoute)
app.use('/api/reserves' , reserveRoute)
app.use('/api/visit' , visitRoute)


app.use('/' , homeRoute)

app.use(errorHandler)




const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});