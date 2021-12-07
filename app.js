const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

//db
const connectDB = require("./db/connect");

//imports
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const { authRouter, userRouter, productRouter } = require("./routes");
const authenticateUser = require("./middleware/authentication");

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(fileupload({useTempFiles: true}))

//routes
const base_url = "/api/v1";

app.get("/", (req, res) => {
  res.send("Home");
});
app.use(`${base_url}/auth`, authRouter);
app.use(`${base_url}/users`, authenticateUser, userRouter);
app.use(`${base_url}/products`, productRouter);

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
