import assert from "assert";
import check from "check-types";
import { subscribe } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
import { publish } from "./publish";
export default async function on_message(message, socket) {
    const obj = JSON.parse(String(message));
    assert(typeof obj == "object");
    assert(!Array.isArray(obj));
    assert(obj instanceof Object);
    if ((obj === null || obj === void 0 ? void 0 : obj.type) === "subscribe") {
        assert(check.like(obj, { type: "subscribe", channel: "string" }));
        const channel = Reflect.get(obj, "channel");
        await subscribe(socket, channel);
    }
    else if ((obj === null || obj === void 0 ? void 0 : obj.type) === "unsubscribe") {
        assert(check.like(obj, { type: "unsubscribe", channel: "string" }));
        const channel = Reflect.get(obj, "channel");
        await unsubscribe(socket, channel);
    }
    else if ((obj === null || obj === void 0 ? void 0 : obj.type) === "publish") {
        assert(check.like(obj, { type: "publish", channel: "string" }));
        assert(Reflect.has(obj, "message"));
        const channel = Reflect.get(obj, "channel");
        const message = Reflect.get(obj, "message");
        await publish(channel, message);
    }
    else {
        throw TypeError("invalid message type:" +
            "expected 'type' to be 'subscribe' or 'unsubscribe' ,or 'publish'" +
            "but:" +
            String(message));
    }
}
