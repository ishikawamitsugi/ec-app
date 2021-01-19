import React, {useState, useCallback, useEffect} from 'react'
import {db} from '../firebase/index';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import { IProductData } from '../reducks/products/types';
import { ImageSwiper, SizeTable } from '../components/products/index';

const useStyles = makeStyles((theme: any) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
    price: {
        fontSize: 36
    }
}))

const returnCodeToBr = (text: string)=> {
    if (text ==='') {
        return text;
    }
    else {
        return HTMLReactParser(text.replace(/¥r?¥n/g, '<br>'));
    }
}
const ProductDetail: React.FC<any> = () => {
    const classes = useStyles();
    // 肩を指定することでtypescriptのnullチェックを回避する
    const [product, setProduct] = useState<IProductData | null>(null);

    const selector = useSelector((state:any) => state);
    const pathName = selector.router.location.pathname;
    const product_id = pathName.split('/product/')[1];

    useEffect(() => {
        db.collection('products').doc(product_id).get()
        .then((document:any) => {
            const data = document.data();
            setProduct(data);
        });  
    },[]);

    return (
        <section className='c-section-wrapin'>
            { product !== null  && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>¥{(product.price).toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable sizes={product.sizes}/>
                        <div className="module-spacer--small"/>
                        <p>{returnCodeToBr(product.discription)}</p>
                    </div>
                </div>
            )}
        </section>
    )
}
export default ProductDetail;