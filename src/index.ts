const port = 2000;
import process from "process";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import http from "http";
import ws from "ws";
import home from "./home";
const logger = morgan("tiny");
const app = express();
app.use(logger);
app.use(helmet());
app.get("/", home);
const server = http.createServer(app);

const wsserver = new ws.Server({ server, path: "/websocket" });
wsserver.on("connection", (socket) => {
    // console.log(socket);
    socket.on("open", () => {
        socket.send("test");
        setTimeout(function timeout() {
            socket.send(Date.now());
        }, 500);
    });
    socket.on("error", (error) => {
        console.log(error);
    });
    socket.on("message", (message) => {
        console.log("received: %s", message);
        socket.send(Date.now());
        setTimeout(function timeout() {
            socket.send(Date.now());
        }, 500);
    });
    socket.on("close", (code, reason) => {
        console.log({ code, reason });
    });
});
server.listen({ host: "localhost", port: port }, () =>
    console.log("listening " + port)
);
process.on("unhandledRejection", console.error);
