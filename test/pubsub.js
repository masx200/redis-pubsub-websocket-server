import createwebsocket from "./createws";
function checkchannel(channel) {
    if (!(typeof channel === "string")) {
        throw new TypeError("channel expected to be string");
    }
}
function createpubsub(opt = {}) {
    if (!(this instanceof createpubsub)) {
        return Reflect.construct(createpubsub, [opt]);
    }
    const { url, channels, port, host, path, protocol } = opt;
    const socket = createwebsocket({ url, port, host, path, protocol });
    const target = new EventTarget();
    const channelset = new Set(
        channels !== null && channels !== void 0 ? channels : []
    );
    const reconnect = socket.reconnect.bind(socket);
    const close = socket.close.bind(socket);
    function send(data) {
        if (!data) {
            throw new TypeError("falsy data ");
        }
        if (!(socket.readyState === socket.OPEN)) {
            throw Error("The connection is not currently OPEN.");
        }
        const msg = typeof data === "string" ? data : JSON.stringify(data);
        socket.send(msg);
    }
    function publish(channel, message) {
        checkchannel(channel);
        if (!message) {
            throw new TypeError("falsy message");
        }
        send({ type: "publish", channel, message });
    }
    function subscribe(channel) {
        checkchannel(channel);
        channelset.add(channel);
        send(JSON.stringify({ type: "subscribe", channel }));
    }
    function unsubscribe(channel) {
        checkchannel(channel);
        channelset.delete(channel);
        send(JSON.stringify({ type: "unsubscribe", channel }));
    }
    socket.addEventListener("open", (e) => {
        console.log("open");
        target.dispatchEvent(new Event("open"));
    });
    socket.addEventListener("close", (e) => {
        const { code, reason } = e;
        console.log("close", code, reason);
        const event = Object.assign(new Event("close"), { code, reason });
        target.dispatchEvent(event);
    });
    socket.addEventListener("error", (e) => {
        console.log("error");
        target.dispatchEvent(new Event("error"));
    });
    socket.addEventListener("message", (e) => {
        console.log("message", e.data);
        const { data } = e;
        const event = Object.assign(new Event("message"), { data });
        target.dispatchEvent(event);
    });
    socket.addEventListener("open", (e) => {
        channelset.forEach((channel) => {
            subscribe(channel);
        });
    });
    socket.addEventListener("message", (e) => {
        try {
            const data = JSON.parse(e.data);
            if (data && typeof data === "object") {
                console.log(data);
                const event = Object.assign(new Event("json"), { data });
                target.dispatchEvent(event);
            }
        } catch (error) {}
    });
    const pubsub = {
        get url() {
            return socket.url;
        },
        publish,
        get readyState() {
            return socket.readyState;
        },
        reconnect,
        send,
        close,
        subscribe,
        unsubscribe,
        get channels() {
            return channelset;
        },
        // [Symbol.toStringTag]: "PublishSubscribeClient",
    };
    const instance = Object.assign(target, pubsub);
    Object.defineProperty(instance, Symbol.toStringTag, {
        enumerable: true,
        value: "PublishSubscribeClient",
    });
    Object.defineProperty(instance, "readyState", {
        enumerable: true,
        get() {
            return socket.readyState;
        },
    });
    instance.addEventListener = instance.addEventListener.bind(instance);
    instance.removeEventListener = instance.removeEventListener.bind(instance);
    instance.dispatchEvent = instance.dispatchEvent.bind(instance);
    Object.freeze(instance);
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(instance));
    return this;
}
export default createpubsub;
