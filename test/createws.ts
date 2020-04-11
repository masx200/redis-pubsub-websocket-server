import ReconnectingWebSocket from "reconnecting-websocket";
function createwebsocket(
    opt: {
        port?: number | undefined;
        host?: string | undefined;
        path?: string | undefined;
        protocol?: "ws:" | "wss:" | undefined;
    } = {}
): ReconnectingWebSocket {
    const {
        port = 80,
        host = "localhost",
        path = "/websocket",
        protocol = "ws:",
    } = opt;
    const origin = "http://localhost";
    const url = new URL(origin);
    url.protocol = protocol;
    url.port = String(port);
    url.host = host;
    url.pathname = path;
    const socket = new ReconnectingWebSocket(url.href);

    return socket;
}
export default createwebsocket;
