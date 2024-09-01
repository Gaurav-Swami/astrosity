import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./models/db.js";
import "dotenv/config";
import authRouter from "./routes/authRouter.js";
import blogRouter from "./routes/blogRouter.js";


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  console.log("home");
  return res.status(200).send("Welcome to our webstie");
});

app.use("/auth", authRouter); 
app.use("/blogs", blogRouter);


app.listen(PORT, () => {
  console.log("The server is running...");
});
