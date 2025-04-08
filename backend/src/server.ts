import express, { Router } from "express";
import http from "http";
import { Server } from "socket.io";
import { SocketInitializer } from "./modules/socket";
import { UserController } from "./modules/user/application/controller/user.controller";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const socketInit = new SocketInitializer(io);

const route = Router();
app.use(express.json());

const userController = new UserController();

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} - ${req.url}`);
  next();
});

socketInit.initializeSocket();

app.use("/user", userController.router);
app.use(route);

server.listen(3333, () => "server running on port 3333");
