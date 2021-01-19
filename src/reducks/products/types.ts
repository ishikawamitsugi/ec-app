export interface IProductData {
    product_id: string;
    name: string;
    discription: string;
    category: string;
    gender: string;
    price: number;
    sizes: Array<any>;
    images: Array<any>;
    updated_at: firebase.firestore.Timestamp;
    [propName: string]: any;
}
