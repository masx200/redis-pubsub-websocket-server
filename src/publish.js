import redis_client_pub from "./redis-client-publisher";
export async function publish(channel, message) {
    const msg = typeof message === "string" ? message : JSON.stringify(message);
    await redis_client_pub.publish(channel, msg).then(() => {
        console.log("redis publish", channel, message);
    });
}
