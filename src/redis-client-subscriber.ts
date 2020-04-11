import ws from "ws";
import ioredis from "ioredis";
import { listensocketmap } from "./listen-socket-map";

const redis_client = new ioredis({ port: 6379, host: "localhost" });
console.log("subscriber", redis_client);
redis_client.ping().then((pong) => console.log("ping", pong));

redis_client.on("message", async function (channel, message) {
    console.log("Receive message: %s from channel: %s", message, channel);
    let objmsg = message;
    try {
        objmsg = JSON.parse(message);
    } catch {}
    const listeners = listensocketmap.get(channel);
    const data = { type: "message", channel, message: objmsg };
    listeners &&
        listeners.forEach((socket) => {
            socket.readyState === ws.OPEN
                ? socket.send(JSON.stringify(data))
                : listeners.delete(socket);
        });
});
export default redis_client;
