import {auth,FirebaseTimestamp, db} from '../../firebase/index';
import {push} from 'connected-react-router';
import {signInAction, signOutAction} from './actions';

export const resetPassword = (email: string) => {
    return async (dispatch: any) => {
        if (!email) {
            alert('必須項目が未入力です');
        } 
        else {
            auth.sendPasswordResetEmail(email).then(() => {
                alert('入力されたアドレスにパスワードリセット用のEメールを送信しました');
                dispatch(push('/signin'));
            }).catch(() => {
                alert('入力されたアドレスにパスワードリセット用のEメールの送信に失敗しました');
            })
        }
    }
    
}
export const signOut = () => {
    return async (dispatch:any)  => {
        return auth.signOut().then(() => {
            dispatch(signOutAction());
            dispatch(push('/signin'));
        });
    } 
}
// asyncをreturn で返すのがreduxthunkの基本系
export const listenAuthState = () => {
    return async (dispatch:any) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    if (data !== undefined) {
                        console.log('data: '  + data);
                        dispatch(signInAction(
                            {
                                uid: uid,
                                username: data.username,
                                isSignedIn: true,
                                role: data.role
                            }
                        ));
                    }
                });
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}
export const signIn = (email :string, password: string) => {
    return async (dispatch: any) => {
        if (email === '' || password === '' ) {
            alert('必須項目が未入力です。')
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            const user =  result.user;
            if (user) {
                console.log(user)
                const uid = user.uid;
                db.collection('users').doc(uid)
                .get().then(snapshot => {
                    const data = snapshot.data();
                    if (data !== undefined) {
                        dispatch(signInAction(
                            {
                                uid: uid,
                                username: data.username,
                                isSignedIn: true,
                                role: data.role
                            }
                        ));
                        console.log(data);
                        dispatch(push('/'));
                    }
                });
            }
        })
    }
}
export const signUp = (username: string, email:string, password: string, confirmPassword: string) => {
    return async (dispatch: any) => {
        if (username === '' || email === '' || password === '' || confirmPassword === '' ) {
            alert('必須項目が未入力です。')
            return false
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致していないです。')
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                // dispatch(showLoadingAction("Sign up..."))
                const user = result.user
                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now();

                    const userInitData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    };
                    console.log(userInitData);
                    db.collection('users').doc(uid).set(userInitData).then( () => {
                        // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        // await sendThankYouMail({
                        //     email: email,
                        //     userId: uid,
                        //     username: username,
                        // });
                        dispatch(push('/'))
                        // dispatch(hideLoadingAction())
                    })
                }
            }).catch((error) => {
                // dispatch(hideLoadingAction())
                console.log(error);
                alert('アカウント登録に失敗しました。もう1度お試しください。');
                dispatch(push('/signup'));
                // throw new Error(error);
            })
    }
}