{
    const path = "/websocket";
    const origin = location.origin;
    const url = new URL(path, origin);
    url.protocol = "ws:";
    const ws = new WebSocket(url.href);
    console.log(ws);
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
}
