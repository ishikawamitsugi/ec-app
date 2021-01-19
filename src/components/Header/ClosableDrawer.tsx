import React, {useState, useCallback} from 'react'
import { makeStyles, createStyles } from '@material-ui/styles';
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon , ListItemText} from '@material-ui/core';
import { TextInput } from '../UIkit/index';
import  SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {push} from 'connected-react-router';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: any) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const ClosableDrawer: React.FC<any> = (props) => {
    const classes = useStyles();
    const { container } = props;

    const [keyword, setKeyword] = useState('');

    const inputKeyword = useCallback((e: any) => {
        setKeyword(e.target.value);
    },[setKeyword]);

    const dispatch = useDispatch();

    const selectMenu = (event: any, path: any ) => {
        dispatch(push(path));
        props.onClose(event);
    };

    const menus = [
        {func: selectMenu, label: "商品登録",    icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon/>,   id: "history",  value: "/order/history"},
        {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ];

    return (
        <nav className={classes.drawer}>
            <Drawer container={container}
                variant='temporary'
                anchor='right' // どこから出てくるのか
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >

            <div>
                <div className={classes.searchField}>
                    <TextInput fullwidth={false}
                        multiline={false}
                        onChange={inputKeyword}
                        required={false}
                        label={'キーワードを入力'}
                        row={0}
                        value={keyword}
                        type={'text'}
                    />
                </div>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                </div>
                <Divider />
                <List>
                    {menus.map((menu):any => (
                        <ListItem key= {menu.id} onClick={(e) => menu.func(e, menu.value)}>
                            <ListItemIcon>
                              {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </LIstItem>
                    ))}
                    <ListItem button key={'logout'}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={'ログアウト'} />
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    )
}

export default ClosableDrawer;