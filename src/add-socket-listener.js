import { listensocketmap } from "./listen-socket-map";
export async function addsocketlistener(channel, socket) {
    const haschannel = listensocketmap.get(channel);
    const listeners = haschannel !== null && haschannel !== void 0 ? haschannel : (() => {
        let listenset = new Set();
        listensocketmap.set(channel, listenset);
        return listenset;
    })();
    listeners.add(socket);
    console.log(listensocketmap);
}
