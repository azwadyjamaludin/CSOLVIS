import React, {useState} from 'react'
import {Paper} from "@material-ui/core";
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

function Step4(props)  {
    const classes = useStyles();
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [step4output,setStep4Output] = useState(''); const [step4formula, setStep4formula] = useState('')
    let processProp = ''; let formulaProp = '';

    const step4OnBlur1 = (e) => {
        setStep4Output(e.target.value)
    }

    const step4OnBlur2 = (e) => {
        setStep4formula(e.target.value)
    }

    const step4OnClickSubmit = async() => {
        processProp = step4output+' '+'='+' '+step4formula
        formulaProp = step4output+' '+'='+' '+step4formula
        const data = {process:processProp,formula:formulaProp,sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/step4', data).then((res) => {
                props.IPOData(res.data.ipo)
        }).catch(function (error) {
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                SweetAlertSetting(error)
            }
        })
        setStep4Output('');setStep4formula('')
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
                    <b>Insert a formula to calculate the output</b>
                </Typography>
                <form >
                <TextField id={'step4a'}
                           label={'Output name'}
                           name={'Output'}
                           autoFocus
                           variant={'outlined'}
                           color={'secondary'}
                           value={step4output}
                           onChange={step4OnBlur1}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                <Button>=</Button>
                <TextField id={'step4b'}
                           label={'Arithmetic formula'}
                           name={'Formula'}
                           variant={'outlined'}
                           color={'secondary'}
                           value={step4formula}
                           onChange={step4OnBlur2}
                           helperText="PI * jejari * jejari"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={step4OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
                </form>
            </Paper>
        </div>
    )
}
export default Step4
