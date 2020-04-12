import ReconnectingWebSocket from "reconnecting-websocket";
function createwebsocket(
    opt: string|{
        url?: URL | string;
        port?: number | undefined;
        host?: string | undefined;
        path?: string | undefined;
        protocol?: "ws:" | "wss:" | undefined;
    } = {}
): ReconnectingWebSocket {
    const { url, port, host, path, protocol } = opt;
    const origin = url ?? "http://localhost/websocket";
    const UrlProvider = new URL(String(origin));
    protocol && (UrlProvider.protocol = protocol);
    port && (UrlProvider.port = String(port));
    host && (UrlProvider.host = host);
    path && (UrlProvider.pathname = path);
    if (UrlProvider.protocol === "https:") {
        UrlProvider.protocol = "wss:";
    }
    if (UrlProvider.protocol === "http:") {
        UrlProvider.protocol = "ws:";
    }
    const socket = new ReconnectingWebSocket(UrlProvider.href);

    return socket;
}
export default createwebsocket;
