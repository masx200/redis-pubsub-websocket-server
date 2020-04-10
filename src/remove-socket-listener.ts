import ws from "ws";
import { listensocketmap } from "./listensocketmap";
export function removesocketlistener(name: string, socket: ws) {
    const haschannel = listensocketmap.get(name);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocketmap.set(name, listenset);
            return listenset;
        })();

    listeners.delete(socket);
    console.log(listensocketmap);
}
