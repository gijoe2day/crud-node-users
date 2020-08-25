const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { MONGODB_URI } = require("./config");

//middlewares
app.use(express.json());

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

//routing
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running in server ${PORT}`);
});
