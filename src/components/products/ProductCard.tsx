import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteProduct } from '../../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
  root: {
      [theme.breakpoints.down('sm')]: {
          margin: 8,
          width: 'calc(50% - 16px)'
      },
      [theme.breakpoints.up('md')]: {
          margin: 16,
          width: 'calc(33.3333% - 32px)'
      }
  },
  content: {
      display: 'flex',
      padding: '16 8',
      textAlign: 'left',
      '&:last-child': {
          paddingBottom: 16
      }
  },
  icon: {
      marginRight: 0,
      marginLeft: 'auto'
  },
  media: {
      height: 0,
      paddingTop: '100%'
  },
  price: {
      color: theme.palette.secondary.dark,
      fontSize: 16

  },
  productName: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      fontSize: 14,
      lineHeight: '18px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
          height: 36,
          lineClamp: 2,
      },
      [theme.breakpoints.up('md')]: {
          height: 18,
          lineClamp: 1,
      }
  }
}));

const ProductCard : React.FC<any> =(props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event:any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

    const classes = useStyles();
    const images = (props.images.length > 0) ? props.images: [{path: NoImage}];
    const price = props.price.toLocaleString();
    const dispatch = useDispatch();

    console.log('ProductCard id = :' + props.product_id);
    return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
        className={classes.media}
        image={images[0].path}
        title=""
        onClick= {() => {dispatch(push('/product/' + props.product_id))}}
        />
        <CardContent className={classes.content}>
        <div>
            <Typography className={classes.productName} color='textSecondary' component='p'>
                {props.name}
            </Typography>
            <Typography className={classes.price} color='textSecondary' component='p'>  
                ¥{props.price}
            </Typography>        
        </div>
        <IconButton onClick={handleClick} >
        <MoreVertIcon />
        </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* この関数の外で宣言された関数をonCLickにしたい時には、アロー関数で呼び出す必要がある。*/}
              <MenuItem onClick={() => {
                 dispatch(push('/product/edit/' + props.product_id))
                 handleClose()}}>
                編集する
              </MenuItem>
              <MenuItem onClick= {() => {
                dispatch(deleteProduct(props.product_id));
                handleClose()
              }}>
                削除する
              </MenuItem>
            </Menu>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}

export default ProductCard;