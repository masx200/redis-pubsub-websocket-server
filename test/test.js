/**
 * @param {{ port?: number; host?: "localhost"; path?: "/websocket"; protocol?: "ws:"; origin?: "http://localhost"; }} opt
 */
function createws(opt = {}) {
    const {
        port = 80,
        host = "localhost",
        path = "/websocket",
        protocol = "ws:",
        origin = "http://localhost",
    } = opt;

    const url = new URL(path, origin);
    url.protocol = protocol;
    url.port = String(port);
    url.host = host;
    const ws = new WebSocket(url.href);
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
