import ws from "ws";
declare const handle_ws: (socket: ws) => Promise<void>;
export default handle_ws;
