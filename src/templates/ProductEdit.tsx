import React, {useEffect} from 'react';
import {TextInput, SelectBox, PrimaryButton} from '../components/UIkit';
import {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import '../assets/style.css';
import ImageArea from '../components/products/imageArea';
import SetSizeArea from '../components/products/setSizeArea';
import { db } from '../firebase/index';

const  ProductEdit: React.FC<any> = () => {
    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    let id = window.location.pathname.split('/product/edit')[1];
    if (id !== '') {
        id = id.split('/')[1];
    }

    useEffect(() => {
        console.log('id : ' + id);
        if (id !== '') {
            db.collection('products').doc(id).get()
            .then((snapshot: any) => {
               const data = snapshot.data();
               setName(data.name);
               setDiscription(data.discription);
               setCategory(data.category);
               setGender(data.gender);
               setPrice(data.price);
               console.log(data.sizes);
               setSizes(data.sizes);
               setImages(data.images);
               console.log('コレクションの更新に成功');
            })
            .catch(() => {
                alert('dbからデータの取得に失敗しました')
            });
        }  
    },[id]);

    const inputName = useCallback((event: any) => {
        setName(event.target.value);
    }, [setName]);

    const inputDiscription = useCallback((event:any)=> {
        setDiscription(event.target.value);
    }, [setDiscription]);

    const inputPrice = useCallback((event: any) => {
        setPrice(event.target.value);
    }, [setPrice]);

    const categories = [
        {'id': 'tops', 'name': 'トップス'},
        {'id': 'sharts', 'name': 'シャツ'},
        {'id': 'pants', 'name': 'パンツ'},
        {'id': 'all', 'name': '全て'}
    ]
    const genders = [
        {'id': 'all', 'name': 'すべて'},
        {'id': 'men', 'name': '男性'},
        {'id': 'women', 'name': '女性'}
    ]
    const dispatch = useDispatch();
    return (
        <section>
            <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
            <div className='c-section-container'>
        {/* onChangeは状態が変わった際にに実行する関数を登録するだけ、即時に実行される訳ではないから
            onClickはクリックされた際に関数を実行したいので、U() => function名 */}
        <ImageArea images={images} setImages={setImages}/>
        <TextInput 
        fullWidth={true} label={'商品名'} margin='dense' multiline={false}
        required={true} rows ={1} value={name} type={'text'} onChange={inputName}/>

        <TextInput 
        fullWidth={true} label={'商品説明'} margin='dense' multiline={true}
        required={true} rows ={5} value={discription} type={'text'} onChange={inputDiscription}/> 

        <SelectBox label= {'カテゴリー'} required={true} value={category} options= {categories} select={setCategory}/>

        <SelectBox label= {'性別'} required= {true} value={gender} options={genders} select={setGender} />

        <TextInput 
        fullWidth={true} label={'価格'} margin='dense' multiline={false}
        required={true} rows ={1} value={price} type={'number'} onChange={inputPrice}/>  
        </div>
        <SetSizeArea sizes={sizes} setSizes={setSizes}/>
        <div className='odule-spacer--medium'/>
        <div className='center'>
            <PrimaryButton label={'登録'}
            　onClick={() => dispatch(
                    saveProduct(id, name, discription, category, gender, price, sizes, images)
                    )}/>
        </div>
        </section> 
    )
}

export default ProductEdit;