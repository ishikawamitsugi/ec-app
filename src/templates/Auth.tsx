import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getSignedIn} from '../reducks/users/selectors';
import { listenAuthState } from '../reducks/users/operations';

const Auth: React.FC<any>= ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const isSignedIn = getSignedIn(selector)

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    });
    console.log('isSignedIn: ' + isSignedIn);
    if (!isSignedIn) {
        return <div>NOT AUTH</div>
    } else {
        return children
    }
};
export default Auth;