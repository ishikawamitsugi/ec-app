import initialState from '../store/initialState';
import * as Action from './actions';

const UsersReducer = (state: any = initialState.users, action: any) => {
    switch(action.type) {
        case Action.SIGN_IN :
            return { ...state, ...action.payload }
        case Action.SIGN_OUT :
            // state を書かないとaction.payloadにないものは消える
            return { ...action.payload }
        default:
            return state; 
    }
}

export default UsersReducer;