const s = document.createElement("script");
s.src = "https://cdn.bootcss.com/socket.io/2.3.0/socket.io.js";
document.head.appendChild(s);
s.onload = () => {
    start();
};
function start() {
    const socket = io(location.origin, {
        path: "/websocket",
    });
    console.log(socket);
    socket.on("connect", () => {
        console.log("connect");
    });
}
