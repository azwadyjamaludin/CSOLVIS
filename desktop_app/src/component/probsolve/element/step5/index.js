import React, {useState} from 'react'
import {InputAdornment, Paper, withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
        backgroundColor:"#bcd4e6"
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

function Step5(props)  {
    const classes = useStyles();
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [step5if, setStep5if] = useState(''); const [step5do, setStep5do] = useState('');
    const [step5else, setStep5else] = useState('')
    let processProp = '';

    const step5OnBlur1 = (e) => {
        setStep5if(e.target.value)
    }

    const step5OnBlur2 = (e) => {
        setStep5do(e.target.value)
    }

    const step5OnBlur3 = (e) => {
        setStep5else(e.target.value)
    }

    const step5OnClickSubmit = async() => {
        processProp = `If ${step5if}; Do ${step5do}; Else ${step5else}`
        const data = {process:processProp,sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/step5', data).then((res) => {
                props.IPOData(res.data.ipo)
        }).catch(function (error) {
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network')
            } else {
                SweetAlertSetting(error)
            }
        })
        setStep5if('');setStep5do('');setStep5else('')
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
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <u>CONDITIONAL ACTION</u>
                </Typography>
                <form >
                <TextField id={'step5a'}
                           label={'Selection condition'}
                           name={'Condition'}
                           autoFocus
                           variant={'outlined'}
                           color={'secondary'}
                           value={step5if}
                           onChange={step5OnBlur1}
                           helperText="Example: jejari < 0"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       If
                                   </InputAdornment>
                               ),
                           }}
                />
                <br/><br/>
                    <BootstrapButton >
                        if the condition is met
                    </BootstrapButton>
                    &nbsp;
                <TextField id={'step5b'}
                           label={'if-true action/formula'}
                           name={'Action'}
                           variant={'outlined'}
                           color={'secondary'}
                           value={step5do}
                           onChange={step5OnBlur2}
                           helperText="Example: luasbulatan = 0"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       do
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;&nbsp;
                <TextField id={'step5c'}
                           label={'if-false action/formula'}
                           name={'Action'}
                           variant={'outlined'}
                           color={'secondary'}
                           value={step5else}
                           onChange={step5OnBlur3}
                           helperText="Example: proceed"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       else
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={step5OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
                </form>
            </Paper>
        </div>
    )
}
export default Step5