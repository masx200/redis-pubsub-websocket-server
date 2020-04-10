import ws from "ws";
import { listensocketmap } from "./listensocketmap";
export default async function on_close(socket: ws) {
    const listenersets = Array.from(listensocketmap.values());
    listenersets.forEach((set) => {
        set.delete(socket);
    });
    console.log(listensocketmap);
}
