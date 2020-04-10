import { createws } from "./createws";
const socket = createws({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
});
const channels = ["test", "event-127.0.0.1-5000"];
function subscribe(channel: string) {
    socket.send(JSON.stringify({ type: "subscribe", channel }));
}
socket.addEventListener("open", (e) => {
    channels.forEach((channel) => {
        subscribe(channel);
    });
});

socket.addEventListener("message", (e) => {
    console.log(JSON.parse(e.data));
});

Reflect.set(window, "socket", socket);

Reflect.set(window, "channels", channels);
console.log(socket);
