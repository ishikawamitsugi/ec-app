import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import {Badge} from "@material-ui/core";

const HeaderMenus : React.FC<any> = (props) => {
    return (
        <div>
            <IconButton>
                <Badge badgeContent={'3'} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)} >
                <MenuIcon />
            </IconButton>
        </div>
    )
}

export default HeaderMenus;