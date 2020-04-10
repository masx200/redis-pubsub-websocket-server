import ws from "ws";
import ioredis from "ioredis";
const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then((pong) => console.log("ping", pong));

export async function subscribe(
    socket: ws,
    obj: { type: "subscribe"; channel: string }
) {
    console.log(socket, obj);
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
