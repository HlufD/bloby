import { CONTENT_TYPE } from "./enums/content-type.enum";
import { HTTP_METHODS, METHODS_WITH_BODY } from "./enums/methods.enum";
import { IncomingMessage as Request, ServerResponse as Response, createServer } from "node:http";

const readJsonBody = async (req: Request, res: Response): Promise<any> => {
    const contentType = req.headers["content-type"];
    const method = req.method!.toUpperCase();

    return new Promise((resolve, reject) => {
        let body = "";
        if (METHODS_WITH_BODY.has(method as HTTP_METHODS) && contentType === CONTENT_TYPE.JSON) {

            req.on("data", (chunk: Buffer) => {
                body += chunk.toString();
            })

            req.on("end", () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve(parsed);
                } catch (error) {
                    reject(error);
                }
            })

            req.on("error", (error) => {
                reject(error);
            });
        }

    })
}


const server = createServer(async (req: Request, res: Response) => {
    try {
        const body = await readJsonBody(req, res);
        console.log("Parsed JSON:", body);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, body }));
    } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON");
    }
})


server.listen(3000, () => console.log("Server running on port 3000"));
