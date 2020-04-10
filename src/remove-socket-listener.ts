import ws from "ws";
import { listensocketmap } from "./listensocketmap";

export async function removesocketlistener(name: string, socket: ws) {
    const haschannel = listensocketmap.get(name);

    const listeners =
        haschannel ??
        (() => {
            let listenset = new Set<ws>();
            listensocketmap.set(name, listenset);
            return listenset;
        })();

    listeners.delete(socket);
    // 当所有监听者都删除后redis应该取消订阅
  
    console.log(listensocketmap);
}
