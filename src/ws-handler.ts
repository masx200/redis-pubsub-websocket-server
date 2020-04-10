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
    });
    socket.on("message", async (message) => {
        try {
            console.log("websocket received: ", message);
            const obj = JSON.parse(String(message));
            assert(typeof obj == "object");
            assert(!Array.isArray(obj));
            assert(obj instanceof Object);
            if (obj?.type === "subscribe") {
                assert(
                    check.like(obj, { type: "subscribe", channel: "string" })
                );
                subscribe(socket, obj);
            } else if (obj?.type === "unsubscribe") {
                assert(
                    check.like(obj, { type: "unsubscribe", channel: "string" })
                );
                unsubscribe(socket, obj);
            }
        } catch (error) {
            // socket.emit("error", error);
            console.error(error);
            // https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent
            /* 1008	Policy Violation	由于收到不符合约定的数据而断开连接. 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景. */
            socket.close(1008, String(error));
        }
    });
    socket.on("close", async (code, reason) => {
        console.log("websocket closed", code, reason);
    });
    socket.emit("open");
};
export default handle_ws;
