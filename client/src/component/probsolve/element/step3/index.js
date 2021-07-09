import React, {useEffect, useState} from 'react'
import {
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

function Step3(props) {
    const URL = `${process.env.REACT_APP_REST_HOST}:${process.env.REACT_APP_REST_PORT}`;
    //const URL = 'http://localhost:3002'
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
    const [atypes , setAtypes] = useState('');
    let inputProp = ''; let processProp = ''; let varProp = '';

    useEffect(() => {
        if (!URL) {
            SweetAlertSetting('Please check your network / IP setting')
        }
    },[])

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
        inputProp = dataname
        processProp = dataname+' '+'='+' '+datavalue
        varProp = atypes+' '+dataname+' '+'='+' '+datavalue
        const data = {input:inputProp,process:processProp,variable:varProp,sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/step3',data).then((res) => {
            props.IPOData(res.data.ipo)
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
        setDataname(''); setDatavalue(''); setAtypes('')
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
                    What other data is given/needed?
                </Typography>
                <form >
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
                               backgroundColor: '#f5f5f5',
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
                               backgroundColor: '#f5f5f5',
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
                    onClick={step3OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
                </form>
            </Paper>
        </div>
    )
}
export default Step3
