import pubsub from "./dist/pubsub.js";
const suber = pubsub({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
    channels: ["test", "event-127.0.0.1-5000"],
});
console.log(pubsub);
console.log(suber);
const puber = pubsub({
    host: "localhost",
    port: 2000,
    path: "/websocket",
    channels: ["broadcast"],
});
console.log(puber);
const client = pubsub({ url: "ws://localhost:2000/websocket" });
console.log(client);
const psc = pubsub("ws://localhost:2000/websocket");
console.log(psc);
[suber, puber, client, psc].forEach((a) => {
    a.channels.add("broadcast");

    a.addEventListener("error", console.log);
    a.addEventListener("open", console.log);
    a.addEventListener("close", console.log);
    a.addEventListener("message", console.log);
});
