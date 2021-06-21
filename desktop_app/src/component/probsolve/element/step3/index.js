import React, {useEffect, useState} from 'react'
import {
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

const Step3 = ({input,process,variable}) => {
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

    const [dataname,setDataname] = useState('');const [datavalue,setDatavalue] = useState('')
    const [atypes , setAtypes] = useState('')

    const step3OnBlur1 = (e) => {
        setDataname(e.target.value)
    }

    const step3OnBlur2 = (e) => {
        setDatavalue(e.target.value)
    }

    const step3OnSelect = (e) => {
        setAtypes(e.target.value)
    }

    const step3OnClickSubmit = async() => {
        input = dataname
        process = dataname+''+'='+''+datavalue
        variable = atypes+''+dataname+''+'='+''+datavalue
        setDatavalue('');setDatavalue('');setAtypes('')
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    What other data is given/needed?
                </Typography>
                <TextField id={'step3a'}
                           label={'Data name'}
                           name={'data_name'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={dataname}
                           onChange={step3OnBlur1}
                           helperText="Eample : Pi"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                <Button>=</Button>
                <TextField id={'step3b'}
                           label={'Data value'}
                           name={'data_value'}
                           variant={'outlined'}
                           color={'primary'}
                           value={datavalue}
                           onChange={step3OnBlur2}
                           helperText="3.142"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <TextField
                    id="selectStep3"
                    select
                    label="Types"
                    onChange={step3OnSelect}
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
                &nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={step3OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>
        </div>
    )
}
export default Step3
