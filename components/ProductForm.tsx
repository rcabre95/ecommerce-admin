import { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UploadIcon from "./icons/UploadIcon";

export default function ProductForm({ _id, title:existingTitle, description:existingDescription, price:existingPrice, images}: { _id?: string, title?: string, description?: string, price?: number, images: Array<any>}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [backToProducts, setBackToProducts] = useState(false)

    const { push } = useRouter();

    async function saveProduct(event: any) {
        event.preventDefault();
        const data = {title, description, price}
        if (_id) {
            // update
            await axios.put('/api/products', {...data, _id});
        } else {
            // create
            await axios.post('/api/products', data);
        }
        setBackToProducts(true);
    }

    useEffect(() => {
        if (backToProducts) {
            push('/products')
        }
    }, [backToProducts])

    async function uploadImages(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target?.files;
        if (files) {
            if (files.length > 0) {
                const data = new FormData();
                for (let i = 0; i < files.length; i++) {
                    data.append('file', files[i]);
                    const res = await axios.post('/api/upload', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    console.log(res.data)
                }
            }
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <h1>New Product</h1>
            <label htmlFor="">Product Name</label>
            <input
            type="text"
            placeholder='Product Name'
            value={title}
            onChange={event => { setTitle(event.target.value) }}
            />
            <label>Photos</label>
            <div className="mb-2">
                <label className="w-24 h-24 flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                    <UploadIcon />
                    Upload
                    <input type="file" className="hidden" onChange={uploadImages} accept="image/png, image/jpeg, image/jpg" />
                </label>
                {!images?.length ? <div>
                    No photos available
                </div> : null}
            </div>
            <label htmlFor="">Description</label>
            <textarea placeholder='Description'
            value={description}
            onChange={event => { setDescription(event.target.value )}}></textarea>
            <label htmlFor="">Price (in USD)</label>
            <input
            type="number"
            placeholder='Price'
            value={price}
            onChange={event => { setPrice(Number(event.target.value)) }}
            />
            <button type="submit" className="btn-primary">
                Save
            </button>
        </form>
    )
}