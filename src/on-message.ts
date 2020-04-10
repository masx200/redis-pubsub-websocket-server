import ws from "ws";
import assert from "assert";
import check from "check-types";
import { subscribe } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
export default async function on_message(message: string, socket: ws) {
    console.log("websocket received: ", message);
    const obj = JSON.parse(String(message));
    assert(typeof obj == "object");
    assert(!Array.isArray(obj));
    assert(obj instanceof Object);
    if (obj?.type === "subscribe") {
        assert(check.like(obj, { type: "subscribe", channel: "string" }));
        let channel = Reflect.get(obj, "channel");
        subscribe(socket, channel);
    } else if (obj?.type === "unsubscribe") {
        assert(check.like(obj, { type: "unsubscribe", channel: "string" }));
        let channel = Reflect.get(obj, "channel");
        unsubscribe(socket, channel);
    }
}
