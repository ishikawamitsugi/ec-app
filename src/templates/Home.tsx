import React from 'react';
import {useSelector, useDispatch }from 'react-redux';
// import {getUserName, getUid} from '../reducks/users/selectors';
import {signOut} from '../reducks/users/operations';

const Home: React.FC<any> =(props) => {

    // const selector = useSelector((state: any) => state);
    // const username = getUserName(selector);

    const users  = (state: any) => state.users.username;
    const uids = (state:any) => state.users.uid;
    const username = useSelector(users);
    const uid = useSelector(uids);
    const dispatch = useDispatch();
    // const uid = getUid(selector);

    return (
        <div>
        <h2>UserName : {username}</h2>
        <h2>Uid: {uid}</h2>
        <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
    )
}

export default Home;