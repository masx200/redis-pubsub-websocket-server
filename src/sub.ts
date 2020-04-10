import ioredis from "ioredis";
const redis = new ioredis({ port: 6379, host: "localhost" });
export async function subscribe(obj: any) {
    console.log(obj);
}
export async function unsubscribe(obj: any) {
    console.log(obj);
}
