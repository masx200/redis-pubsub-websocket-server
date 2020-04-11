import createpubsub from "./pubsub";
const ps = createpubsub({
    port: 2000,
    host: "localhost",
    path: "/websocket",
    protocol: "ws:",
    channels: ["test", "event-127.0.0.1-5000"],
});
console.log(createpubsub);
console.log(ps);
