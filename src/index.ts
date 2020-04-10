const port = 2000;
import express from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import process from "process";
import ws from "ws";
import home from "./home";
import handle_ws from "./ws-handler";
const logger = morgan("tiny");
const app = express();
app.use(logger);
app.use(helmet());
app.get("/", home);
const server = http.createServer(app);

const wsserver = new ws.Server({ server, path: "/websocket" });

wsserver.on("connection", handle_ws);
server.listen({ host: "localhost", port: port }, () =>
    console.log("listening " + port)
);
process.on("unhandledRejection", console.error);
