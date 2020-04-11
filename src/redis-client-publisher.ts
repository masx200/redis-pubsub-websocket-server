import ioredis from "ioredis";

const redis_client = new ioredis({ port: 6379, host: "localhost" });
console.log("publisher", redis_client);
redis_client.ping().then((pong) => console.log("ping", pong));

export default redis_client;
