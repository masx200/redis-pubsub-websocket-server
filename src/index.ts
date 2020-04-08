const port = 2000;
import process from "process";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import http from "http";
import socketio from "socket.io";
import home from "./home";
const logger = morgan("tiny");
const app = express();
app.use(logger);
app.use(helmet());
app.get("/", home);
const server = http.createServer(app);
const io = socketio(server, { path: "/websocket" });
io.on("connection", (socket) => {
    // console.log(socket);
});
server.listen({ host: "localhost", port: port }, () =>
    console.log("listening " + port)
);
process.on("unhandledRejection", console.error);
