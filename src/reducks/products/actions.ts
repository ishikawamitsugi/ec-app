export const FEATCH_PRODUCTS = 'FEATCH_PRODUCTS';
export const FetchProductsAction = (products: Array<any>) => {
    return {
        type: 'FEATCH_PRODUCTS',
        payload: products
    }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DeleteProductAction = (products: Array<any>) => {
    return {
        type:'DELETE_PRODUCT',
        payload: products
    }
}