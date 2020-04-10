import ioredis from "ioredis";
const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then(console.log);
export async function subscribe(obj: any) {
    console.log(obj);
}
export async function unsubscribe(obj: any) {
    console.log(obj);
}
