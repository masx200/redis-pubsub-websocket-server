import ws from "ws";
import { listensocketmap } from "./listen-socket-map";

export async function removesocketlistener(channel: string, socket: ws) {
    const haschannel = listensocketmap.get(channel);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocketmap.set(channel, listenset);
            return listenset;
        })();

    listeners.delete(socket);
    // 当所有监听者都删除后redis应该取消订阅

    console.log(listensocketmap);
}
