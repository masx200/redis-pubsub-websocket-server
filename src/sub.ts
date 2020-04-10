import ioredis from "ioredis";
import ws from "ws";
const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then((pong) => console.log("ping", pong));
redisclient.on("message", function (channel, message) {
    console.log("Receive message %s from channel %s", message, channel);
});
const listensocketmap = new Map<string, Set<ws>>();
export async function subscribe(socket: ws, channel: string) {
    console.log(socket, channel);

    const haschannel = listensocketmap.get(channel);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocketmap.set(channel, listenset);
            return listenset;
        })();

    listeners.add(socket);
    console.log(listensocketmap);
    await redisclient
        .subscribe(channel)
        .then(() => console.log("subscribe ", channel));
}
export async function unsubscribe(
    socket: ws,

    channel: string
) {
    console.log(socket, channel);
}
