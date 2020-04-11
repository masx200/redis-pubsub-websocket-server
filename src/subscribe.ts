import ws from "ws";
import { addsocketlistener } from "./add-socket-listener";
import { redisclient } from "./redis-client";
export async function subscribe(socket: ws, channel: string) {
    // console.log("subscribe", channel);
    await addsocketlistener(channel, socket);

    await redisclient
        .subscribe(channel)
        .then(() => console.log("redis subscribe ", channel));
}
