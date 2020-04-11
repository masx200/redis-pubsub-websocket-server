import createpubsub from "./pubsub";
const suber = createpubsub({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
    channels: ["test", "event-127.0.0.1-5000"],
});
console.log(createpubsub);
console.log(suber);
const puber = createpubsub({
    host: "localhost",
    port: 2000,
    path: "/websocket",
    channels: ["broadcast"],
});
console.log(puber);
console.log(createpubsub({ url: "ws://localhost:2000/websocket" }));
