import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({ _id, title:existingTitle, description:existingDescription, price:existingPrice}: { _id?: string, title?: string, description?: string, price?: number}) {

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