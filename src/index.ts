import { CONTENT_TYPE } from "./enums/content-type.enum";
import { HTTP_METHODS, METHODS_WITH_BODY } from "./enums/methods.enum";
import { IncomingMessage as Request } from "node:http";

const readJsonBody = async (req: Request): Promise<any> => {
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

export { readJsonBody }