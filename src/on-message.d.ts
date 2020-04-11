import ws from "ws";
export default function on_message(message: string, socket: ws): Promise<void>;
