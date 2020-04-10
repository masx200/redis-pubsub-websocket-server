import { createws } from "./createws";
function pubsub(opt: {
        port?: number | undefined;
        host?: string| undefined;
        path?: string | undefined;
        protocol?: "ws:"|"wss:" | undefined;
        channels?:string[]|undefined
    } = {}
){
	const {channels=[],
	   port= 2000,
    host= "localhost",
    path="/websocket",
    protocol="ws:",
	
	}=opt
const socket = createws({
    port,
    host,
    path,
    protocol,
});
const channelset = new Set(channels);
function subscribe(channel: string) {
    channelset.add(channel);
    socket.send(JSON.stringify({ type: "subscribe", channel }));
}
function unsubscribe(channel: string) {
    channelset.delete(channel);
    socket.send(JSON.stringify({ type: "unsubscribe", channel }));
}
socket.addEventListener("open", (e) => {
    channelset.forEach((channel) => {
        subscribe(channel);
    });
});

socket.addEventListener("message", (e) => {
    console.log(JSON.parse(e.data));
});


return {socket,subscribe,unsubscribe,channels:channelset}
}

export{pubsub}
//Reflect.set(window, "socket", socket);

//Reflect.set(window, "channelset", channelset);
//console.log(socket);
//Reflect.set(window, "subscribe", subscribe);
//Reflect.set(window, "unsubscribe", unsubscribe);
