import ioredis from "ioredis";
const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then((pong) => console.log("ping", pong));

export async function subscribe(obj: { type: "subscribe"; channel: string }) {
    console.log(obj);
}
export async function unsubscribe(obj: {
    type: "unsubscribe";
    channel: string;
}) {
    console.log(obj);
}
