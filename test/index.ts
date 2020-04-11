import pubsub from "./pubsub";
const suber = new pubsub({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
    channels: ["test", "event-127.0.0.1-5000"],
});
console.log(pubsub);
console.log(suber);
const puber = new pubsub({
    host: "localhost",
    port: 2000,
    path: "/websocket",
    channels: ["broadcast"],
});
console.log(puber);
const pubsub = new pubsub({ url: "ws://localhost:2000/websocket" });
console.log(pubsub);
[suber, puber, pubsub].forEach((a) => a.channels.add("broadcast"));
