import ws from "ws";
import { listensocketmap } from "./listen-socket-map";
import { redisclient } from "./redis-client";
export default async function on_close(socket: ws) {
    const listenersets = Array.from(listensocketmap.values());
    listenersets.forEach((socketset) => {
        socketset.delete(socket);
    });
    console.log(listensocketmap);
    // 查找没有监听者的channel,都取消订阅
    listensocketmap.forEach(async (socketset, channel) => {
        if (socketset.size === 0) {
            await redisclient
                .unsubscribe(channel)
                .then(() => console.log("redis unsubscribe ", channel));
        }
    });
}
