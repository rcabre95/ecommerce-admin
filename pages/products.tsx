import Layout from "@/components/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import PenIcon from "@/components/icons/PenIcon"
import TrashIcon from "@/components/icons/TrashIcon"

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data)
        })
    }, [])

  return (
    <Layout>
        <Link className="bg-blue-900 text-white rounded-md py-1 px-1" href={`/products/new`}>
            Add new product
        </Link>
        <table className={`basic mt-2`}>
            <thead>
                <tr>
                    <td>Product Name</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {products.map((product: any) => (
                    <tr>
                        <td>{product.title}</td>
                        <td>
                            <Link href={`/products/edit/${product._id}`}>
                                <PenIcon />
                                Edit
                            </Link>
                            <Link href={`/products/delete/${product._id}`}>
                                <TrashIcon />
                                Delete
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Layout>
  )
}
