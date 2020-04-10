import ws from "ws";
import { listensocketmap } from "./listensocketmap";
export async function addsocketlistener(channel: string, socket: ws) {
    const haschannel = listensocketmap.get(channel);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocketmap.set(channel, listenset);
            return listenset;
        })();

    listeners.add(socket);
    console.log(listensocketmap);
}
