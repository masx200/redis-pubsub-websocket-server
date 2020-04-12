import createwebsocket from "./createws";

function checkchannel(channel: string) {
    if (!(typeof channel === "string")) {
        throw new TypeError("channel expected to be string");
    }
}
class createpubsub extends EventTarget {
    constructor(
        opt: {
            url?: URL | string;
            port?: number | undefined;
            host?: string | undefined;
            path?: string | undefined;
            protocol?: "ws:" | "wss:" | undefined;
            channels?: string[] | undefined | Set<string>;
        } = {}
    ) {
        super();

        const instance = this;
        const { url, channels, port, host, path, protocol } = opt;
        const socket = createwebsocket({ url, port, host, path, protocol });

        const channelset = new Set(channels ?? []);
        const reconnect = socket.reconnect.bind(socket);
        const close = socket.close.bind(socket);
        function send(data: any) {
            if (!data) {
                throw new TypeError("falsy data ");
            }
            if (!(socket.readyState === socket.OPEN)) {
                throw Error("The connection is not currently OPEN.");
            }

            const msg = typeof data === "string" ? data : JSON.stringify(data);
            socket.send(msg);
        }

        function publish(channel: string, message: any) {
            checkchannel(channel);
            if (!message) {
                throw new TypeError("falsy message");
            }

            send({ type: "publish", channel, message });
        }
        function subscribe(channel: string) {
            checkchannel(channel);
            channelset.add(channel);

            if (socket.readyState === socket.OPEN) {
                send(JSON.stringify({ type: "subscribe", channel }));
            }
        }
        function unsubscribe(channel: string) {
            checkchannel(channel);
            channelset.delete(channel);

            if (socket.readyState === socket.OPEN) {
                send(JSON.stringify({ type: "unsubscribe", channel }));
            }
        }
        socket.addEventListener("open", (e) => {
            console.log("open");
            instance.dispatchEvent(new Event("open"));
        });
        socket.addEventListener("close", (e) => {
            const { code, reason, wasClean } = e;
            console.log("close", code, reason, wasClean);
            const event = Object.assign(new Event("close"), {
                code,
                reason,
                wasClean,
            });
            instance.dispatchEvent(event);
        });
        socket.addEventListener("error", (e) => {
            const { error, message } = e;
            console.log("error", e.error, e.message);
            const event = Object.assign(new Event("error"), { error, message });
            instance.dispatchEvent(event);
        });
        socket.addEventListener("message", (e) => {
            console.log("message", e.data);
            //  const { data } = e;
            //const event = Object.assign(new Event("message"), { data });
            // instance.dispatchEvent(event);
        });
        socket.addEventListener("open", (e) => {
            channelset.forEach((channel) => {
                subscribe(channel);
            });
        });

        socket.addEventListener("message", (e) => {
            try {
                const data = JSON.parse(e.data);

                if (data && typeof data === "object" && !Array.isArray(data)) {
                    console.log(data);
                    const { type } = data;
                    if (!type) {
                        throw TypeError("falsy event type");
                    }
                    const event = Object.assign(new Event(String(type)), data);
                    instance.dispatchEvent(event);
                } else {
                    throw new TypeError("invalid revceived data");
                }
            } catch (error) {
                const { message } = error;
                const event = Object.assign(new Event("error"), {
                    error,
                    message,
                });
                instance.dispatchEvent(event);
            }
        });

        const pubsub = {
            get url() {
                return Reflect.get(socket, "_url");
            },

            publish,
            get readyState() {
                return socket.readyState;
            },
            reconnect,
            send,

            close,
            subscribe,
            unsubscribe,

            get channels() {
                return channelset;
            },
        };

        Object.defineProperties(
            instance,
            Object.getOwnPropertyDescriptors(pubsub)
        );
        Object.defineProperty(instance, Symbol.toStringTag, {
            enumerable: true,
            value: "PublishSubscribeClient",
        });

        instance.addEventListener = instance.addEventListener.bind(instance);
        instance.removeEventListener = instance.removeEventListener.bind(
            instance
        );
        instance.dispatchEvent = instance.dispatchEvent.bind(instance);
    }
    readonly url!: string;
    publish!: (channel: string, message: any) => void;
    readonly readyState!: number;
    reconnect!: (
        code?: number | undefined,
        reason?: string | undefined
    ) => void;
    send!: (data: any) => void;
    close!: (code?: number | undefined, reason?: string | undefined) => void;
    subscribe!: (channel: string) => void;
    unsubscribe!: (channel: string) => void;
    readonly channels!: Set<string>;
    readonly [Symbol.toStringTag]: string;
}
const pubsub = (opt?: {
    url?: URL | string;
    port?: number | undefined;
    host?: string | undefined;
    path?: string | undefined;
    protocol?: "ws:" | "wss:" | undefined;
    channels?: string[] | undefined | Set<string>;
}): PublishSubscribeClient => {
    return Reflect.construct(createpubsub, [opt]) as PublishSubscribeClient;
};

export default pubsub;
export type PublishSubscribeClient = EventTarget & {
    readonly url: string;
    publish: (channel: string, message: any) => void;
    readonly readyState: number;
    reconnect: (code?: number | undefined, reason?: string | undefined) => void;
    send: (data: any) => void;
    close: (code?: number | undefined, reason?: string | undefined) => void;
    subscribe: (channel: string) => void;
    unsubscribe: (channel: string) => void;
    readonly channels: Set<string>;
    readonly [Symbol.toStringTag]: string;
};
