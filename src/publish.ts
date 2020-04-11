import { redisclient } from "./redis-client";

export async function publish(channel: string, message: any) {
    const msg = typeof message === "string" ? message : JSON.stringify(message);
    await redisclient.publish(channel, msg).then(() => {
        console.log("publish success ", channel, message);
    });
}
