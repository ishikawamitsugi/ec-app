import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';
import { ProductCard } from '../components/products/index';


const ProductList: React.FC<any> = () => {
    const dispatch = useDispatch();

    // reducxのストア全体を入れる
    const selector = useSelector((state:any) => state);

    // storeの中のProductsのリストだけを取ってくる
    const products = getProducts(selector);

    useEffect(() => {
        dispatch(fetchProducts());
    },[]);

    products.forEach((product: any) => {
        console.log('product =' + product.product_id);
    });

    return (
        <section className='c-section_-wrapin' >
            <div className='p-grid__row'>
                 { (products.length > 0) && products.map((product: any) => (
                     <ProductCard key={product.product_id} 
                     name={product.name} 
                     price={product.price.toString()} 
                     images= {product.images}
                     product_id={product.product_id}/>
                ))}
            </div>
        </section>

    )
}

export default ProductList;