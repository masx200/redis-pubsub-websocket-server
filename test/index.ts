import pubsub from "./pubsub";
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
[suber, puber, client].forEach((a) => a.channels.add("broadcast"));
