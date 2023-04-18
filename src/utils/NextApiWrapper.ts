import { ErrorResponse } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";

export type NextApiResponseData = ErrorResponse | Response;

export function NextApiWrapper<T>(fn: (req: NextApiRequest, res: NextApiResponse<T>) => void) {
    return async (req: NextApiRequest, res: NextApiResponse<T>) => {
        try {
            await fn(req, res);
        } catch (e) {
            res.status(500).json({
                error: "Internal Server Error",
                timeStamp: new Date().getTime(),
                ok: false
            } as T);
        }
    };
}