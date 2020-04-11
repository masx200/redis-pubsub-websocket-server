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
    function subscribe(channel: string) {
        channelset.add(channel);
        socket.send(JSON.stringify({ type: "subscribe", channel }));
    }
    function unsubscribe(channel: string) {
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
    function close(code?: number | undefined, reason?: string | undefined) {
        socket.close(code, reason);
    }
    function reconnect(code?: number | undefined, reason?: string | undefined) {
        socket.reconnect(code, reason);
    }
    function publish(channel: string, message: any) {
        send({ type: "publish", channel, message });
    }
    return {
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
        get channels() {
            return Object.freeze(Array.from(channelset));
        },
    };
}

export default createpubsub;
