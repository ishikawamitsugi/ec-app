import React, {useState, useCallback} from 'react';
import TableContainer from '@material-ui/core/Paper';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/core/styles';
import {TextInput} from  '../UIkit/index';

const useStyle = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})
const SetSizeArea: React.FC<any> = (props: any) => {
    const classes = useStyle();

    const [index, setIndex] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [size, setSize] = useState('');

    const inputQuantity = useCallback((event)=> {
        setQuantity(event.target.value);
    }, [setQuantity]);

    const inputSize = useCallback ((event) => {
        setSize(event.target.value);
    }, [setSize]);

    const addSize = (index: number,  size:string, quantity: string ) => {
        if (size === '' || quantity === '') {
            return false;
        } else {
            if (index === props.sizes.length) {
                props.setSizes((prevState: any )=> [...prevState, {size: size, quantity: quantity}]);
                setIndex(index + 1);
                setSize('');
                setQuantity('');
            } else {
                const newSizes = props.sizes;
                newSizes[index] = {size: size, quantity: quantity}
                props.setSizes(newSizes);
            }
           
        }
    }
    const editSize = (index: number , size: string, quantity: string) => {
        setSize(size);
        setIndex(index);
        setQuantity(quantity);
    }
    return (
        <div>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.sizes.length > '' && (
                            props.sizes.map((item: any, i: number) => (
                                <TableRow key={item.size}>
                                    <TableCell >{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell}>
                                            <EditIcon onClick={() => editSize(item.i, item.size, item.quantity)}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        <TableRow>
                            <TableCell></TableCell>                 
                        </TableRow>

                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={'サイズ'} multiline={false} required={true}
                        rows={1} type={"text"} onChange={inputSize} value={size}
                    />
                    <TextInput
                        fullWidth={false} label={'量'} multiline={false} required={true}
                        rows={1} type={"number"}  onChange={inputQuantity} value={quantity}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
        </div>
    ) 
}

export default SetSizeArea;