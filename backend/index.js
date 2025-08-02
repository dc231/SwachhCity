const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser"); 
const cors = require("cors");

const authRoute = require("./Routes/AuthRoute");
const complaintRoute = require('./Routes/ComplaintRoute');
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

app.use(
  cors({
    origin: ["http://localhost:5173","https://swachh-tracker-dheeraj-chaudhary.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json()); 
app.use("/", authRoute); 
app.use("/", complaintRoute);