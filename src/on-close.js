import { listensocketmap } from "./listen-socket-map";
import redis_client_sub from "./redis-client-subscriber";
export default async function on_close(socket) {
    const listenersets = Array.from(listensocketmap.values());
    listenersets.forEach((socketset) => {
        socketset.delete(socket);
    });
    console.log(listensocketmap);
    listensocketmap.forEach(async (socketset, channel) => {
        if (socketset.size === 0) {
            await redis_client_sub
                .unsubscribe(channel)
                .then(() => console.log("redis unsubscribe ", channel));
        }
    });
}
