import redis_client_sub from "./redis-client-subscriber";
import { removesocketlistener } from "./remove-socket-listener";
import { listensocketmap } from "./listen-socket-map";
export async function unsubscribe(socket, channel) {
    await removesocketlistener(channel, socket);
    const listeners = listensocketmap.get(channel);
    if (listeners && listeners.size === 0) {
        await redis_client_sub
            .unsubscribe(channel)
            .then(() => console.log("redis unsubscribe ", channel));
    }
}
