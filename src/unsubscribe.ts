import ws from "ws";
import { removesocketlistener } from "./remove-socket-listener";
export async function unsubscribe(
    socket: ws,

    channel: string
) {
    console.log("unsubscribe", channel);
    removesocketlistener(channel, socket);
}
