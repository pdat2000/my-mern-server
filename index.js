import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.js";
import mongoose from "mongoose";

const URI =
  "mongodb+srv://admin:rTmaMsIALM0SU7Ey@cluster0.b80w5l6.mongodb.net/mern-app?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

//router
app.use("/posts", posts);

//connect db
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err:", err);
  });
