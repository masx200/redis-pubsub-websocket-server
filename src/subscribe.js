import { addsocketlistener } from "./add-socket-listener";
import redis_client_sub from "./redis-client-subscriber";
export async function subscribe(socket, channel) {
    await addsocketlistener(channel, socket);
    await redis_client_sub
        .subscribe(channel)
        .then(() => console.log("redis subscribe ", channel));
}
