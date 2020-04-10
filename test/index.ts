import { createws } from "./createws";
const socket = createws({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
});
const channelset = new Set(["test", "event-127.0.0.1-5000"]);
function subscribe(channel: string) {
    channelset.add(channel);
    socket.send(JSON.stringify({ type: "subscribe", channel }));
}
function unsubscribe(channel: string) {
    channelset.delete(channel);
    socket.send(JSON.stringify({ type: "unsubscribe", channel }));
}
socket.addEventListener("open", (e) => {
    channelset.forEach((channel) => {
        subscribe(channel);
    });
});

socket.addEventListener("message", (e) => {
    console.log(JSON.parse(e.data));
});

Reflect.set(window, "socket", socket);

Reflect.set(window, "channelset", channelset);
console.log(socket);
Reflect.set(window, "subscribe", subscribe);
Reflect.set(window, "unsubscribe", unsubscribe);
