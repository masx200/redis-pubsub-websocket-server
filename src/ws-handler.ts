import check from "check-types";
import ws from "ws";
import { subscribe, unsubscribe } from "./sub";
import assert from "assert";
const handle_ws = async (socket: ws) => {
    // console.log(socket);

    socket.on("open", async () => {
        console.log("websocket connected");
        // socket.send("test");
        // setTimeout(function timeout() {
        //     socket.send(Date.now());
        // }, 500);
    });
    socket.on("error", async (error) => {
        console.log("websocket error", error);
        // console.log(error);
    });
    socket.on("message", async (message) => {
        console.log("websocket received: ", message);
        const obj = JSON.parse(String(message));
        assert(typeof obj == "object");
        assert(!Array.isArray(obj));
        if (obj?.type === "subscribe") {
            assert(check.like(obj, { type: "subscribe", channel: "string" }));
            subscribe(obj);
        } else if (obj?.type === "unsubscribe") {
            assert(check.like(obj, { type: "unsubscribe", channel: "string" }));
            unsubscribe(obj);
        }
        // socket.send(Date.now());
        // setTimeout(function timeout() {
        //     socket.send(Date.now());
        // }, 500);
    });
    socket.on("close", async (code, reason) => {
        console.log("websocket closed", code, reason);
    });
    socket.emit("open");
};
export default handle_ws;
