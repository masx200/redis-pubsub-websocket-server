import { Response, Request } from "express";
export default (_req: Request, res: Response) => {
    res.status(200).set("Content-Type", "text/html").send(
        `<html><head></head><body><h1>hello world</h1> 
        <h1>发布订阅</h1>
        <h1>/websocket</h1></body></html>`
    );
};
