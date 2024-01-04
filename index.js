const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db_connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/users", userRoute);

app.listen(
  process.env.PORT || 5002,
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT}`
  )
);
