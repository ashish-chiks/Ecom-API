const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

//db
const connectDB = require("./db/connect");

//imports
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const { authRouter } = require("./routes");

//middlewares
app.use(express.json());

//routes
const base_url = "/api/v1";

app.get("/", (req, res) => {
  res.send("Home");
});
app.use(`${base_url}/auth`, authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
