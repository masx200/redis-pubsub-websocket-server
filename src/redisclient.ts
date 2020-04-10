import ioredis from "ioredis";
export const redisclient = new ioredis({ port: 6379, host: "localhost" });
redisclient.ping().then((pong) => console.log("ping", pong));
redisclient.on("message", async function (channel, message) {
    console.log("Receive message %s from channel %s", message, channel);
});
