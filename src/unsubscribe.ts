import ws from "ws";
export async function unsubscribe(
    socket: ws,

    channel: string
) {
    console.log(socket, channel);
}
