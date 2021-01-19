import {createStore as reduxCreateStore,
     combineReducers,
     applyMiddleware
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import UsersReducer from '../users/reducers';
import ProductsReducer from '../products/reducers';

import thunk from 'redux-thunk';

export const createStore: any= (history: any) => {
    let middlewares = [ routerMiddleware(history), thunk ] ;
    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            users : UsersReducer,
            router : connectRouter(history)
        }),
        applyMiddleware(
           ...middlewares
        )
    )
}
export default createStore;