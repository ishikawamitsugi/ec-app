import React, { useState, useCallback } from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit/index';
import { signIn }from '../reducks/users/operations';
import { useDispatch} from 'react-redux';
import { push } from 'connected-react-router';
import '../assets/style.css';

const SignIn :React.FC<any> = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const inputEmail = useCallback((event)=> {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputPassword = useCallback((event)=> {
        setPassword(event.target.value);
    }, [setPassword]);
    
    return(
        <div className="c-section-container">
        <h2 className="u-text-center u-text__headline">サインイン</h2>
        <div className="module-spacer--medium" />
        <TextInput
            fullWidth={true} label={'email'} multiline={false} required={true}
            rows={1} value={email} type={"text"} onChange={inputEmail}
        />
       
        <TextInput 
            fullWidth={true} label={'パスワード'} multiline={false} 
            required={true} rows={1} value={password} type={'password'} 
            onChange={inputPassword}
        />
       
        <div className="module-spacer--medium" />
        <div className='center'>
        <PrimaryButton label= {'ログイン'} onClick={() => dispatch(signIn(email,  password))} />
        </div>
        <div className="module-spacer--medium u-text-center" />
        <p onClick= {() => dispatch(push('/signup'))}>アカウントをお持ちでない方はコチラ</p>
        <div className="module-spacer--medium u-text-center" />
        <p onClick= {() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はコチラ</p>
        </div>
    )
}
export default SignIn