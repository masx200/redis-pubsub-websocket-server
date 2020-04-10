import ws from "ws";
import on_message from "./on-message";
import on_close from "./on-close";
const handle_ws = async (socket: ws) => {
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
        } catch (error) {
            // socket.emit("error", error);
            console.error(error);
            // https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent
            /* 1008	Policy Violation	由于收到不符合约定的数据而断开连接. 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景. */
            /* reason 可选
一个人类可读的字符串，它解释了连接关闭的原因。这个UTF-8编码的字符串不能超过123个字节。 */
            let reason = String(error).split("\n").join("");
            let response = JSON.stringify({ msg: reason, type: "error" });
           if( socket.readyState === ws.OPEN){
            socket.send(response);
            socket.close(1008);
                        
                                     
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
