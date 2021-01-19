import React, { useState, useCallback } from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit/index';
import { resetPassword }from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import '../assets/style.css';

const Reset: React.FC<any> = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    
    const inputEmail = useCallback((event)=> {
        setEmail(event.target.value);
    }, [setEmail]);
    
    return(
        <div className="c-section-container">
        <h2 className="u-text-center u-text__headline">リセットパスワード</h2>
        <div className="module-spacer--medium" />
        <TextInput
            fullWidth={true} label={'email'} multiline={false} required={true}
            rows={1} value={email} type={"text"} onChange={inputEmail}
        />
       
        <div className="module-spacer--medium" />
        <div className='center'>
        <PrimaryButton label= {'Reset Password'} onClick={() => dispatch(resetPassword(email))} />
        </div>
        <div className="module-spacer--medium u-text-center" />
        <p onClick={() => {dispatch(push('/signin'))}}>ログイン画面に戻る</p>
        </div>
    )
}
export default Reset;