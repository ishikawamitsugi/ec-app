import { db, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';
import { IProductData } from './types';
import { FetchProductsAction , DeleteProductAction} from './actions';

const productsRef = db.collection('products');

export const deleteProduct = (product_id: string) => {
    return async(dispatch: any, getState: any) => {
        console.log('enter_dispatch');
        productsRef.doc(product_id).delete().then(() => {
            const prevProducts = getState().products.list;
            const nextProducts = prevProducts.filter((product: any)=> product.product_id !== product_id);
            dispatch(DeleteProductAction(nextProducts));
        })
    }
}
export const fetchProducts = () => {
    return async (dispatch : any) => {
        db.collection('products').orderBy('updated_at', 'desc').get()
        .then((snapshots: any) => {
            const productList: Array<any> = [];
            snapshots.forEach((snapshot: any) => {
                console.log('snapshot');
                console.log(snapshot.data());
                productList.push(snapshot.data());
            });
           
            dispatch(FetchProductsAction(productList));
        })
        .catch( () => {})
    }
}

export const saveProduct = (id: string, name: string, discription: string,
     category: string, gender: string, price: string, sizes: Array<any>, images: Array<any>
    ) => {
    return async (dispatch: any) => {

        const timestamp = FirebaseTimestamp.now();
        const ref = productsRef.doc();
        const id = ref.id;

        // 新規作成
        if (id ===　'') {
            
            const data: IProductData = {
                product_id: id,
                category: category,
                discription: discription,
                gender: gender,
                name: name,
                price: parseInt(price, 10),
                created_at:timestamp,
                updated_at: timestamp,
                sizes: sizes,
                images: images
            }

            return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
        } 
        else {
            const data: IProductData = {
                product_id: id,
                category: category,
                discription: discription,
                gender: gender,
                name: name,
                price: parseInt(price, 10),
                updated_at: timestamp,
                sizes: sizes,
                images: images
            }

            return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
        }
        
        
    }
}