import {initialState} from '../store/initialState';
import * as Action from './actions';

const ProductsReducer  = (state: any = initialState.products, action: any)  => {
    switch(action.type){
        case Action.FEATCH_PRODUCTS :
            return {
                ...state,
                list: [...action.payload] // reduxの中で持っているメモリ情報を新しい配列にすることによって書き換わる、これによってこコンポーネント側から更新されたことがわかる
                }
        case Action.DELETE_PRODUCT :
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state;
    }
}

export default ProductsReducer;