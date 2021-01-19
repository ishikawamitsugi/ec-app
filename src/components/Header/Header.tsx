import React, {useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {useSelector, useDispatch} from 'react-redux';
import { getSignedIn } from '../../reducks/users/selectors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../../assets/img/icons/logo.png";
import { push } from 'connected-react-router';
import { HeaderMenus } from './index';
import { ClosableDrawer } from './index';

const useStyles = makeStyles({
    root: {
        flexGrow: 1 // 伸び率、数値が上がるほど伸びる
    },
    menuBar: {
        backgroundColor: '#fff',
        color: '#444',
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024, // ブラウザがこの値より大きくなってもこの要素は1024以上にはならない。
        width: '100%' // ブラウザがこの値より小さかった場合に、ブラウザに依存するということを表している。
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
})
const Header : React.FC<any> = () => {
    const selector = useSelector((state:any) => state);
    const isSignedIn = getSignedIn(selector);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((event: any) =>{
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open);
    }, [setOpen, open]);

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img src={logo} alt='torahuck logo' width= '128px'
                    // この関数で宣言された関数ではない場合はコールバック関数はアロー関数を使う
                    onClick={() => dispatch(push('/'))}/>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                        <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
            <div>
            </div>
        </div>
    )
}

export default Header;