import ReconnectingWebSocket from "reconnecting-websocket";
declare function createwebsocket(opt?: {
    url?: URL | string;
    port?: number | undefined;
    host?: string | undefined;
    path?: string | undefined;
    protocol?: "ws:" | "wss:" | undefined;
}): ReconnectingWebSocket;
export default createwebsocket;
