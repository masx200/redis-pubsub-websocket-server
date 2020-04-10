import ReconnectingWebSocket from "reconnecting-websocket";
function createws(
    opt: {
        port?: number | undefined;
        host?: "localhost" | undefined;
        path?: "/websocket" | undefined;
        protocol?: "ws:" | undefined;
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
    const ws = new ReconnectingWebSocket(url.href);
    // console.log(ws);
    ws.addEventListener("open", (e) => {
        console.log(e);
    });
    ws.addEventListener("close", (e) => {
        console.log(e);
    });
    ws.addEventListener("error", (e) => {
        console.log(e);
    });
    ws.addEventListener("message", (e) => {
        console.log(e);
    });
    return ws;
}
export { createws };
