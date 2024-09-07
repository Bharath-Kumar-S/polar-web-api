import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {
  deleteSubscriber,
  getSubscriber,
  getSubscriberById,
  updateSubscriber,
} from "./controller/subscribeController";
import { authRouter } from "./router/auth";
import { postSubscriber } from "./controller/eventBasedSubscribers";
dotenv.config();

// Database Name
const dbName = "polar-web-io";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/auth", authRouter);

app.get("/health-check", (req, res) => {
  res.send({
    status: "OK",
  });
});

app.post("/subscribers", postSubscriber);
app.get("/subscribers", getSubscriber);
app.get("/subscribers/:id", getSubscriberById);
app.patch("/subscribers/:id", updateSubscriber);
app.delete("/subscribers/:id", deleteSubscriber);

app.listen(PORT, async () => {
  console.log(
    `⚡️⚡️⚡️[server]: Server is running at https://localhost:${PORT} ⚡️⚡️⚡️`
  );
  try {
    console.log("app is started");
    if (!(process.env.NODE_ENV === "test")) {
      mongoose.connect(`${process.env.DBSTRING}`);
      const db = mongoose.connection;
      db.on("error", (err) => {
        console.error(err);
      });
      db.on("open", () => console.log("Connected to DB!!!!"));
    }
  } catch (err) {
    console.log(err);
  }
});
