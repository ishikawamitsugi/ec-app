import React from 'react';
import TableContainer from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles';
import {TextInput} from  '../UIkit/index';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
});

const SizeTable : React.FC<any> = (props) => {
    const classes = useStyles();
    const sizes = props.sizes;
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map((size: any) => (
                            <TableRow key={size.size}>
                                <TableCell component='th' scope='row'>
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    残り{size.quantity}点
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                            <div>売切</div>
                                        )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton>
                                        <FavoriteBorderIcon />
                                        </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                    </TableBody>
                </Table>

        </TableContainer>
    )
}
export default SizeTable;