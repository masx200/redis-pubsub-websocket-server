import createwebsocket from "./createws";
function createpubsub(
    opt: {
        port?: number | undefined;
        host?: string | undefined;
        path?: string | undefined;
        protocol?: "ws:" | "wss:" | undefined;
        channels?: string[] | undefined | Set<string>;
    } = {}
) {
    const {
        channels = [],
        port = 2000,
        host = "localhost",
        path = "/websocket",
        protocol = "ws:",
    } = opt;
    const socket = createwebsocket({
        port,
        host,
        path,
        protocol,
    });
    const channelset = new Set(channels);
    const reconnect = socket.reconnect.bind(socket);
    const close = socket.close.bind(socket);
    const addEventListener = socket.addEventListener.bind(socket);
    const removeEventListener = socket.removeEventListener.bind(socket);
    const dispatchEvent = socket.dispatchEvent.bind(socket);

    function subscribe(channel: string) {
        if (!(typeof channel === "string")) {
            throw new TypeError("channel expected to be string");
        }
        channelset.add(channel);
        socket.send(JSON.stringify({ type: "subscribe", channel }));
    }
    function unsubscribe(channel: string) {
        if (!(typeof channel === "string")) {
            throw new TypeError("channel expected to be string");
        }
        channelset.delete(channel);
        socket.send(JSON.stringify({ type: "unsubscribe", channel }));
    }
    socket.addEventListener("open", (e) => {
        console.log("open ", e.target);
    });
    socket.addEventListener("close", (e) => {
        console.log("close ", e.target, e.code, e.reason);
    });
    socket.addEventListener("error", (e) => {
        console.log("error", e.target);
    });
    socket.addEventListener("message", (e) => {
        console.log("message", e.target, e.data);
    });
    socket.addEventListener("open", (e) => {
        channelset.forEach((channel) => {
            subscribe(channel);
        });
    });

    socket.addEventListener("message", (e) => {
        console.log(JSON.parse(e.data));
    });
    function send(data: any) {
        socket.send(typeof data === "string" ? data : JSON.stringify(data));
    }

    
    function publish(channel: string, message: any) {
        if (!(typeof channel === "string")) {
            throw new TypeError("channel expected to be string");
        }
        send({ type: "publish", channel, message });
    }
    return {
        get url() {
            return socket.url;
        },
        addEventListener,
        removeEventListener,
        publish,
        get readyState() {
            return socket.readyState;
        },
        reconnect,
        send,
        socket,
        close,
        subscribe,
        unsubscribe,
        dispatchEvent,
        get channels() {
            return Object.freeze(Array.from(channelset));
        },
        [Symbol.toStringTag]: "PublishSubscribeClient",
    };
}

export default createpubsub;
