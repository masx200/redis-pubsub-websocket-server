/**
 * @param {{ path?: "/websocket"; protocol?: "ws:"; origin?: string; }} opt
 */
function createws(opt = {}) {
    const {
        path = "/websocket",
        protocol = "ws:",
        origin = "http://localhost",
    } = opt;

    const url = new URL(path, origin);
    url.protocol = protocol;
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
