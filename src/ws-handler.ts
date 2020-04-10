import check from "check-types";
import ws from "ws";
import { subscribe } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
import assert from "assert";
const handle_ws = async (socket: ws) => {
    socket.on("open", async () => {
        console.log(socket);
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
        assert(obj instanceof Object);
        if (obj?.type === "subscribe") {
            assert(check.like(obj, { type: "subscribe", channel: "string" }));
            subscribe(socket, obj);
        } else if (obj?.type === "unsubscribe") {
            assert(check.like(obj, { type: "unsubscribe", channel: "string" }));
            unsubscribe(socket, obj);
        }
    });
    socket.on("close", async (code, reason) => {
        console.log("websocket closed", code, reason);
    });
    socket.emit("open");
};
export default handle_ws;
