import React, {useEffect, useState} from 'react'
import {
    Paper, withStyles
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundColor:"#f5f5f5"
    },
    paperBG2: {
        backgroundColor:"#faf0e6"
    },
    table: {
        minWidth: 650,
    },
}));

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const Step6 = ({process}) => {
    const classes = useStyles();
    const [step6counter,setStep6counter] = useState(''); const [step6repeat,setStep6repeat] = useState('')
    const [atypes , setAtypes] = useState('')

    const step6Blur1 = (e) => {
        setStep6counter(e.target.value)
    }

    const step6OnSelect = (e) => {
        setAtypes(e.target.value)
    }

    const step6Blur2 = (e) => {
        setStep6repeat(e.target.value)
    }

    const step6OnClickSubmit = () => {
        process.append('Repeat for'+''+step6repeat)
        setStep6counter('');setAtypes('');setStep6counter('')
    }

    const types = [
        {
            value: '',
            label: '',
        },
        {
            value: 'char',
            label: 'char',
        },
        {
            value: 'int',
            label: 'int',
        },
        {
            value: 'float',
            label: 'float',
        },
        {
            value: 'double',
            label: 'double',
        },
    ];

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <u>REPEATING ACTION</u>
                </Typography>
                <BootstrapButton >
                    Name of counter
                </BootstrapButton>
                &nbsp;
                <TextField id={'step6a'}
                           label={'counter'}
                           name={'Counter'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={step6counter}
                           onChange={step6Blur1}
                           helperText="Example : x"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <TextField
                    id="selectStep6"
                    select
                    label="Types"
                    onChange={step6OnSelect}
                    helperText=""
                    variant="outlined"
                    value={'int'}
                    size={'small'}
                    style={{
                        backgroundColor: '#FFFAFA',
                        width: 190,
                        textAlign:'left'
                    }}
                >
                    {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br/>
                <BootstrapButton >
                    Repeat for
                </BootstrapButton>
                &nbsp;
                <TextField id={'step6b'}
                           label={'repeat condition'}
                           name={'Condition'}
                           variant={'outlined'}
                           color={'primary'}
                           value={step6repeat}
                           onChange={step6Blur2}
                           helperText="Example : x < 10"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={step6OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>
        </div>
    )
}
export default Step6
