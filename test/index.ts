import { createws } from "./createws";
const rws = createws({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
});

Reflect.set(window, "socket", rws);
console.log(rws);
