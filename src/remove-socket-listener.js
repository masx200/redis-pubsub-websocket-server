import { listensocketmap } from "./listen-socket-map";
export async function removesocketlistener(channel, socket) {
    const haschannel = listensocketmap.get(channel);
    const listeners = haschannel !== null && haschannel !== void 0 ? haschannel : (() => {
        let listenset = new Set();
        listensocketmap.set(channel, listenset);
        return listenset;
    })();
    listeners.delete(socket);
    console.log(listensocketmap);
}
