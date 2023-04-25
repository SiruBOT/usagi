import os from "node:os"
import type { NextApiRequest, NextApiResponse } from "next";

export default function HostName(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).send({
        hostname: os.hostname()
    })
}
