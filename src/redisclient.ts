import ws from "ws";
import ioredis from "ioredis";
import { listensocketmap } from "./listensocketmap";
export const redisclient = new ioredis({ port: 6379, host: "localhost" });
console.log(redisclient);
redisclient.ping().then((pong) => console.log("ping", pong));
redisclient.on("message", async function (channel, message) {
    console.log("Receive message %s from channel %s", message, channel);
    let objmsg = message;
    try {
        objmsg = JSON.parse(message);
    } catch (error) {
        console.error(error);
    }
    const listeners = listensocketmap.get(channel);
    const data = { type: "message", channel, message: objmsg };
    listeners &&
        listeners.forEach((socket) => {
            socket.readyState === ws.OPEN
                ? socket.send(JSON.stringify(data))
                : listeners.delete(socket);
        });
});
