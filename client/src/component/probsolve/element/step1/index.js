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
import axios from "axios";
import Swal from "sweetalert2";

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

function Step1(props)  {
    const [input, setInput] = useState(''); const [atypes, setAtypes] = useState('')
    const URL = `${process.env.REACT_APP_REST_HOST}:${process.env.REACT_APP_REST_PORT}`;
    //const URL = 'http://localhost:3002'
    let inputProp = ''; let processProp = ''; let varProp = '';
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

    useEffect(() => {
        if (!URL) {
            SweetAlertSetting('Please check your network / IP setting')
        }
    },[])

    function step1OnBlur(e) {
        setInput(e.target.value)
    }

    function step1OnSelect(e) {
        setAtypes(e.target.value)
    }

    async function step1OnClickSubmit() {
        inputProp = input
        processProp = 'Get'+' '+input
        varProp = atypes+' '+input+';'
        const data = {sessionID:sessionStorage.getItem('sessionID'),input:inputProp,process:processProp,variable:varProp}
        console.log(data)
        await axios.post(URL+'/routes/dataMgt/step1',data).then((res) => {
             props.IPOData(res.data.ipo)
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
        setInput(''); setAtypes('');
    }

    const SweetAlertSetting =(error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
        })
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    What data will you get from user?
                </Typography>
                <form >
                <TextField id={'step1'}
                           label={'Input name'}
                           name={'Input'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={input}
                           onChange={step1OnBlur}
                           helperText="Example: jejari"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
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
                    value={atypes}
                    size={'small'}
                    style={{
                        backgroundColor: '#f5f5f5',
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
                </form>
            </Paper>
        </div>
    )
}
export default Step1
