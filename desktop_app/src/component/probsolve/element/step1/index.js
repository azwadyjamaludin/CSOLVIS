import React, {useEffect, useState} from 'react'
import {
    InputAdornment,
    Paper
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

const Step1 = ({input,process,variable}) => {
    const [input1,setInput1] = useState('')
    const [atypes , setAtypes] = useState('')

    const classes = useStyles();
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

    const step1OnBlur = (e) => {
        setInput1(e.target.value)
        console.log(input1)
    }

    const step1OnSelect = (e) => {
        setAtypes(e.target.value)
    }

    const step1OnClickSubmit = async() => {
        input = input1
        process = 'Get'+''+input1
        variable = atypes+''+input1+';'
        setInput1('');setAtypes('')
    }

    return(
        <div align={'center'}>

            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    What data will you get from user?
                </Typography>
                <TextField id={'step1'}
                           label={'Input name'}
                           name={'Input'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={input1}
                           onChange={step1OnBlur}
                           helperText="Example: jejari"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       Get
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;&nbsp;
                <TextField
                    id="selectStep1"
                    select
                    label="Types"
                    onChange={step1OnSelect}
                    helperText=""
                    variant="outlined"
                    value={'int'}
                    //margin={'normal'}
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
                &nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={step1OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>
        </div>
    )
}
export default Step1
