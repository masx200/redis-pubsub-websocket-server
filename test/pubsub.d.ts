declare function createpubsub(this: any, opt?: {
    url?: URL | string;
    port?: number | undefined;
    host?: string | undefined;
    path?: string | undefined;
    protocol?: "ws:" | "wss:" | undefined;
    channels?: string[] | undefined | Set<string>;
}): EventTarget & {
    readonly url: string;
    publish: (channel: string, message: any) => void;
    readonly readyState: number;
    reconnect: (code?: number | undefined, reason?: string | undefined) => void;
    send: (data: any) => void;
    close: (code?: number | undefined, reason?: string | undefined) => void;
    subscribe: (channel: string) => void;
    unsubscribe: (channel: string) => void;
    readonly channels: Set<string>;
    [Symbol.toStringTag]: string;
};
export default createpubsub;
