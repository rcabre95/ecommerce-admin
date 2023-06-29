import { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import Image from "next/image";
import UploadIcon from "./icons/UploadIcon";
import Loader from "./Loader";

export default function ProductForm({ _id, title:existingTitle, description:existingDescription, price:existingPrice, images:existingImages}: { _id?: string, title?: string, description?: string, price?: number, images: Array<any>}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState<string>(existingDescription || '');
    const [price, setPrice] = useState<number>(existingPrice || 0);
    const [images, setImages] = useState<Array<any>>(existingImages || []);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [backToProducts, setBackToProducts] = useState<boolean>(false);

    const { push } = useRouter();

    function updateImagesOrder(images: Array<string>) {
        setImages(images);
    }

    async function saveProduct(event: any) {
        event.preventDefault();
        const data = {title, description, price, images}
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
                setIsUploading(true);
                const data = new FormData();
                for (let i = 0; i < files.length; i++) {
                    data.append('file', files[i]);
                    const res = await axios.post('/api/upload', data);
                    setImages(oldImages => {
                        return [...oldImages, ...res.data.links]
                    })
                }
                setIsUploading(false)
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
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable
                className={`flex flex-wrap gap-1`}
                list={images} 
                setList={updateImagesOrder}>
                    {images.length > 0 ? images.map(link => (
                        <div className={`relative h-24 w-36 rounded-lg overflow-hidden`} key={link}>
                            <img src={link} alt="" />
                        </div>
                    )) : null}
                </ReactSortable>
                {isUploading ? (
                    <Loader />
                ) : null}
                <label className="w-24 h-24 flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                    <UploadIcon />
                    Upload
                    <input type="file" className="hidden" onChange={uploadImages} accept="image/png, image/jpeg, image/jpg" />
                </label>
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