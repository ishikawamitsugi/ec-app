import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    formControl: {
        marginBottom: 16,
        minWidth: 128,
        width: '100%'
    }
})
const SelectBox: React.FC<any> = (props) => {
    const classes = useStyles();

    return (
        // FormContorlはFormの領域を確保するために使用する。
        <FormControl className={classes.formControl}>
        <InputLabel> {props.label}</InputLabel>
        {/* // SelectのValueは選択したときに表示される値
        // Selectはメニューをだすための枠を表示するためのコンポーネント
        */}
        <Select required ={props.required} value={props.value}
                onChange={(event) => {props.select(event.target.value)}}
        > 
                {props.options.map((option: any) => (
                    // Meneで囲まれた値は、メニューにだす項目
                    <MenuItem key ={option.id} value={option.id}>{option.name}</MenuItem>
                ))}
        </Select>
        </FormControl>
    )
}

export default SelectBox;