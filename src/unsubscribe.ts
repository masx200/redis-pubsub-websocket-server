import { redisclient } from "./redis-client";
import ws from "ws";
import { removesocketlistener } from "./remove-socket-listener";
import { listensocketmap } from "./listen-socket-map";
export async function unsubscribe(
    socket: ws,

    channel: string
) {
    // console.log("unsubscribe", channel);
    await removesocketlistener(channel, socket);
    const listeners = listensocketmap.get(channel);
    if (listeners && listeners.size === 0) {
        await redisclient
            .unsubscribe(channel)
            .then(() => console.log("redis unsubscribe ", channel));
    }
}
