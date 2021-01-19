import React, { useCallback } from 'react';
import '../../assets/style.css'
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import {storage} from '../../firebase/index';
import ImagePreview from './imagePreview';
const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea: React.FC<any> = (props: any) => {

    const classes = useStyles();
    const images =  props.images;
    const deleteImage = useCallback ((id: any) => {
        const ret = window.confirm('この画像を本当に削除しますか？');
        if (!ret) {
            return false;
        } else {
            const newImages = images.filter((image: any) => image.id !== id);
            props.setImages(newImages);
            return storage.ref('image').child(id).delete();
        }
    },[images]);

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                // 以前のステートに上書きする
                props.setImages(((prevState:any )=> [...prevState, newImage]))
            });
        })
    }, [props.setImages])

    return (
        <div>
            <div className='p-grid__list-images'>
                {(images.length > 0) && (
                    images.map((image: any) => 
                        <ImagePreview id={image.id} path={image.path} key= {image.id} 
                        delete={deleteImage}/>
                    ))
                }
                </div>
            <div className='u-text-right'>
            {/* labelタグで囲ってtypeをinputにするとクリックした際に画像の入力窓が出現する*/}
            <span>商品の画像を登録する</span>
            <IconButton>
            <label>
                <AddPhotoAlternateIcon className={classes.icon}/>
                <input type='file' id='image' className='u-display-none' onChange={(event) => uploadImage(event)}/>
            </label>
            </IconButton>
            </div>
        </div>
    )
}

export default ImageArea;