const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const { userRoutes } = require("./routes/user");
const { chatRoutes } = require("./routes/chat");
const app = express();
require("dotenv").config();

// data base connection
dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// routes 
app.use("/api/v1/auth", userRoutes);
app.use('/api/v1/chat', chatRoutes);


// checking home page
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});


// server started
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server started at port number ${port}`);
});
