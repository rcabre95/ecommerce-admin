import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const { title, description, price, images } = req.body;
        const productDoc = await Product.create({
            title, description, price, images
        });
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const { title, description, price, images, _id } = req.body;
        await Product.updateOne({_id: _id}, {title: title, description: description, price: price, images: images});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}