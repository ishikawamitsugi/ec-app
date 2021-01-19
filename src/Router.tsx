import React from 'react';
import {Route, Switch} from 'react-router';
import {SignUp, SignIn, Reset,　ProductEdit, ProductList, ProductDetail} from './templates/index';
import Auth from './templates/Auth';

const Router: React.FC<any> = () => {
    // exactがないと違う所にルートされる可能性があるので注意する
    return (
        <Switch>
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path={'/signin'} component={SignIn}/>
            <Route exact path={'/signin/reset'} component={Reset} />
            <Auth>
                <Route exact path="(/)?" component={ProductList} />
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route path="/product/edit(/:id)?" component={ProductEdit} />   
            </Auth>     
        </Switch>
    )
}

export  default Router;