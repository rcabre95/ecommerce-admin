import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { redirect } from "next/navigation"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function NewProduct() {
    return (
        <Layout>
            <h1>New Product</h1>
            <ProductForm />
        </Layout>
    )
}
