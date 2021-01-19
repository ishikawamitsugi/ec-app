export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState : any) => {
    return {
        type: 'SIGN_IN',
        payload: {
            uid: userState.uid,
            username: userState.username,
            isSignedIn: true,
            role: userState.role
        }
    }
}
export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
    return {
        type: 'SIGN_OUT',
        payload: {
            uid: '',
            username: '',
            issignedIn: false,
            role: ''
        }
    }
}