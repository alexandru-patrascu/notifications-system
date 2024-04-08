import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import WebSocket from "ws";
import cookieParser from "cookie-parser";
import express, { Express } from "express";

import { User } from "./models/user.modules";
import { Notification } from "./models/notification.modules";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import notificationRoutes from "./routes/notification.routes";

dotenv.config(); // to use the .env file
const app: Express = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cookieParser()); // to parse the incoming cookies
app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cors(corsOptions)); // to allow cross-origin requests

app.use("/api", [userRoutes, authRoutes, notificationRoutes]);

const port = process.env.PORT || 3001;
const wsPort = process.env.WS_PORT || 8080;

const server = http.createServer();
const wss = new WebSocket.Server({ server });

server.listen(wsPort, () => {
  console.log(`WebSocket server is running on port ${wsPort}`);
});

wss.on("connection", (ws: WebSocket) => {
  console.log("A user connected");

  // Send existing messages to the connected client
  Notification.find()
    .sort({ createdAt: -1 })
    .then((notifications) => {
      ws.send(JSON.stringify({ type: "info", data: notifications }));
    });

  // Listen for new messages from the client
  ws.on("message", (msg: string) => {
    const notification = new Notification(JSON.parse(msg));

    console.log("New notification", notification);
    notification.save().then(() => {
      wss.clients.forEach((client) => {
        if ((client as WebSocket).readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", data: notification }));
        }
      });
    });
  });

  ws.on("close", () => {
    console.log("A user disconnected");
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

const initData = async () => {
  const hasAdminUser = await User.findOne({ username: "admin" });

  if (hasAdminUser) {
    return;
  }

  await mongoose.connection.dropDatabase();

  try {
    const users = await User.insertMany([
      {
        username: "admin",
        password: "admin",
        role: "admin",
      },
      {
        username: "customer",
        password: "customer",
        role: "user",
      },
    ]);

    const notifications = await Notification.insertMany([
      {
        message: "The patient has completed the CAM-ICU assessment.",
        type: "info",
        from: users[0]._id,
        to: users[1]._id,
        read: false,
      },
      {
        message: "The patient has completed the CAM-ICU assessment.",
        type: "warning",
        from: users[0]._id,
        to: users[1]._id,
        read: false,
      },
      {
        message: "The patient has completed the CAM-ICU assessment.",
        type: "error",
        from: users[0]._id,
        to: users[1]._id,
        read: false,
      },
    ]);

    console.log({ users, notifications });
  } catch (error) {
    console.error(error);
  }
};

// connect to MongoDB and starting the server
startServer();
initData();
