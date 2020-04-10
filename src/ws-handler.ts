import ws from "ws";

const handle_ws = (socket: ws): void => {
    // console.log(socket);

    socket.on("open", () => {
        socket.send("test");
        setTimeout(function timeout() {
            socket.send(Date.now());
        }, 500);
    });
    socket.on("error", (error) => {
        console.log(error);
    });
    socket.on("message", (message) => {
        console.log("received: %s", message);
        socket.send(Date.now());
        setTimeout(function timeout() {
            socket.send(Date.now());
        }, 500);
    });
    socket.on("close", (code, reason) => {
        console.log({ code, reason });
    });
    socket.emit("open");
};
export default handle_ws;
