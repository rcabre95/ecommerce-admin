import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs';
import mime from 'mime-types';
const bucketName: string = 'raphael-nextjs-ecommerce'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new multiparty.Form();
    const {fields, files} = await new Promise<any>((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        })
    })
    // console.log(files.file);

    const client = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        }
    });
    const links: Array<string> = []
    for (const file of files.file) {
        const ext: string = file.originalFilename.split('.').pop();
        const newFileName = Date.now() + '.' + ext
        // console.log({ext, file})
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path) as string
        }));

        const link: string = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
        links.push(link);
    }
    
    

    return res.json({ links });
}

export const config = {
    api: {
        bodyParser: false
    }
}