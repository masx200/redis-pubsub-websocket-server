import ws from "ws";
import on_message from "./on-message";
import on_close from "./on-close";
import handleerror from "./error-response";
const handle_ws = async (socket) => {
    socket.on("open", async () => {
        console.log("websocket connected");
    });
    socket.on("error", async (error) => {
        console.log("websocket error", error);
    });
    socket.on("message", async (message) => {
        console.log("websocket received: ", message);
        try {
            await on_message(String(message), socket);
        }
        catch (error) {
            console.error(error);
            if (!(error instanceof Error)) {
                socket.close(1008);
                return;
            }
            if (error instanceof Error) {
                const res = handleerror(error);
                let response = JSON.stringify(res);
                if (socket.readyState === ws.OPEN) {
                    socket.send(response);
                    socket.close(1008);
                    return;
                }
            }
        }
    });
    socket.on("close", async (code, reason) => {
        console.log("websocket closed", code, reason);
        await on_close(socket);
    });
    socket.emit("open");
};
export default handle_ws;
