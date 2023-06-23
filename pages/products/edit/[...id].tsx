import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { AnyNsRecord } from 'dns';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState<any>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      if(id) {
        axios.get(`/api/products?id=${id}`).then(res => {
          setProductInfo(res.data)
        })
      }
    }, [id])
  return (
    <Layout>
      <h1>Edit Product</h1>
        {productInfo ? 
        <ProductForm {...productInfo} />
        : null}
    </Layout>
  )
}
