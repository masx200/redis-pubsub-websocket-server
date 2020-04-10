import ws from "ws";
import { addsocketlistener } from "./addsocketlistener";
import { redisclient } from "./redisclient";
export async function subscribe(socket: ws, channel: string) {
    console.log("subscribe", channel);
    addsocketlistener(channel, socket);

    await redisclient
        .subscribe(channel)
        .then(() => console.log("subscribe ", channel));
}
