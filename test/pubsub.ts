import createwebsocket from "./createws";

function checkchannel(channel: string) {
    if (!(typeof channel === "string")) {
        throw new TypeError("channel expected to be string");
    }
}

function createpubsub(
    opt: {
        url?: URL | string;
        port?: number | undefined;
        host?: string | undefined;
        path?: string | undefined;
        protocol?: "ws:" | "wss:" | undefined;
        channels?: string[] | undefined | Set<string>;
    } = {}
) {
    const { url, channels, port, host, path, protocol } = opt;
    const socket = createwebsocket({ url, port, host, path, protocol });
    const target = new EventTarget();

    const channelset = new Set(channels ?? []);
    const reconnect = socket.reconnect.bind(socket);
    const close = socket.close.bind(socket);
    function send(data: any) {
        if (!data) {
            throw new TypeError();
        }
        const msg = typeof data === "string" ? data : JSON.stringify(data);
        socket.send(msg);
    }

    function publish(channel: string, message: any) {
        checkchannel(channel);
        if (!message) {
            throw new TypeError();
        }

        send({ type: "publish", channel, message });
    }
    function subscribe(channel: string) {
        checkchannel(channel);
        channelset.add(channel);
        send(JSON.stringify({ type: "subscribe", channel }));
    }
    function unsubscribe(channel: string) {
        checkchannel(channel);
        channelset.delete(channel);
        send(JSON.stringify({ type: "unsubscribe", channel }));
    }
    socket.addEventListener("open", (e) => {
        console.log("open");
    });
    socket.addEventListener("close", (e) => {
        console.log("close", e.code, e.reason);
    });
    socket.addEventListener("error", (e) => {
        console.log("error");
    });
    socket.addEventListener("message", (e) => {
        console.log("message", e.data);
    });
    socket.addEventListener("open", (e) => {
        channelset.forEach((channel) => {
            subscribe(channel);
        });
    });

    socket.addEventListener("message", (e) => {
        console.log(JSON.parse(e.data));
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
        [Symbol.toStringTag]: "PublishSubscribeClient",
    };

    const instance = Object.assign(target, pubsub);

    Object.defineProperty(instance, "readyState", {
        enumerable: true,

        get() {
            return socket.readyState;
        },
    });
    instance.addEventListener = instance.addEventListener.bind(instance);
    instance.removeEventListener = instance.removeEventListener.bind(instance);
    instance.dispatchEvent = instance.dispatchEvent.bind(instance);
    
    return instance;
}

export default createpubsub;
