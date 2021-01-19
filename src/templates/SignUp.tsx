import React, { useState, useCallback } from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit/index';
import { signUp }from '../reducks/users/operations';
import { useDispatch} from 'react-redux';
import { push } from 'connected-react-router';

import '../assets/style.css';

const Signup :React.FC<any> = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const inputUsername = useCallback((event)=> {
        setUsername(event.target.value);
    }, [setUsername]);

    const inputEmail= useCallback((event)=> {
        setEmail(event.target.value);
    }, [setEmail]);
    
    const inputPassword = useCallback((event)=> {
        setPassword(event.target.value);
    }, [setPassword]);
    
    const inputConfirmPassword = useCallback((event)=> {
        setConfirmPassword(event.target.value);
    }, [setConfirmPassword]);

    return(
        <div className="c-section-container">
        <h2 className="u-text-center u-text__headline">アカウント登録</h2>
        <div className="module-spacer--medium" />
        <TextInput
            fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
            rows={1} value={username} type={"text"} onChange={inputUsername}
        />
        <TextInput 
            fullWidth={true} label={'Eメール'} multiline={false} equired={true} 
            rows={1} value={email} type={'email'} onChange={inputEmail}
        />
        <TextInput fullWidth={true} label={'パスワード'} multiline={false} 
                        required={true} rows={1} value={password} type={'password'} onChange={inputPassword}
        />
        <TextInput fullWidth={true} label={'パスワード再確認'} multiline={false} 
                        required={true} rows={1} value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
        />
        <div className="module-spacer--medium" />
        <div className='center'>
        <PrimaryButton label= {'登録'} onClick={() => dispatch(signUp(username, email, password, confirmPassword))} />
        </div>
        <div className="module-spacer--medium u-text-center" />
        <p onClick={() => dispatch(push('/signin'))}>アカウントを既にお持ちの方はコチラ</p>
        </div>
    )
}
export default Signup