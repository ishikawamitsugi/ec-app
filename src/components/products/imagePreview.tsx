import React from 'react';

const ImagePreview: React.FC<any>  = (props: any) => {
    return (
        <div className='p-media__thumb'>
        <img alt='プレビュー画像' src={props.path} onClick={()=> props.delete(props.id)}></img>
        </div>
    )
}
export default ImagePreview;