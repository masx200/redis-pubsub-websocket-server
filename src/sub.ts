import ws from "ws";
import ioredis from "ioredis";
const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then((pong) => console.log("ping", pong));
redisclient.on("message", function (channel, message) {
    // Receive message Hello world! from channel news
    // Receive message Hello again! from channel music
    console.log("Receive message %s from channel %s", message, channel);
});
const listensocket = new Map<string, Set<ws>>();
export async function subscribe(
    socket: ws,
    obj: { type: "subscribe"; channel: string }
) {
    console.log(socket, obj);
    const { channel } = obj;
    redisclient
        .subscribe(channel)
        .then(() => console.log("subscribe ", channel));
    const haschannel = listensocket.get(channel);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocket.set(channel, listenset);
            return listenset;
        })();

    listeners.add(socket);
}
export async function unsubscribe(
    socket: ws,
    obj: {
        type: "unsubscribe";
        channel: string;
    }
) {
    console.log(socket, obj);
}
