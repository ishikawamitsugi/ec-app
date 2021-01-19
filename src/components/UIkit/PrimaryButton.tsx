import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        backgroundColor: '#4dd0e1',
        color: '#000',
        fontsize: 16,
        height: 48,
        marginBottom: 16,
        width: 256
    }
})
const PrimaryButton: React.FC<any> = (props) => {

    const classes = useStyles();
    return (
        <Button className={classes.button} variant='contained' onClick={() => props.onClick()}>
            {props.label}
         </Button>
    )
}

export default PrimaryButton;