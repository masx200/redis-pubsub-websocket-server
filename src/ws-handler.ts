import ws from "ws";

const handle_ws = (socket: ws): void => {
    // console.log(socket);

    socket.on("open", () => {
        console.log("websocket connected");
        // socket.send("test");
        // setTimeout(function timeout() {
        //     socket.send(Date.now());
        // }, 500);
    });
    socket.on("error", (error) => {
        console.log("websocket error", error);
        // console.log(error);
    });
    socket.on("message", (message) => {
        console.log("websocket received: ", message);
        // socket.send(Date.now());
        // setTimeout(function timeout() {
        //     socket.send(Date.now());
        // }, 500);
    });
    socket.on("close", (code, reason) => {
        console.log("websocket closed", code, reason);
    });
    socket.emit("open");
};
export default handle_ws;
