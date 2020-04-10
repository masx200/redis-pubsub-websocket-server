import { createws } from "./createws";
const socket = createws({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
});
socket.addEventListener("open", (e) => {
    socket.send(JSON.stringify({ type: "subscribe", channel: "test" }));
});

socket.addEventListener("message", (e) => {
    console.log(JSON.parse(e.data));
});

Reflect.set(window, "socket", socket);
console.log(socket);
