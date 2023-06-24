import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new multiparty.Form();
    const {fields, files} = await new Promise<any>((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        })
    })
    console.log('length', files.file.length)
    return res.json('ok')
}

export const config = {
    api: {
        bodyParser: false
    }
}