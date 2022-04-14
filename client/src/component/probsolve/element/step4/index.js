import React, {useState} from 'react'
import {Paper, TextField, Typography, Button} from "@material-ui/core";
import axios from "axios";
import UIAlertIndex from "../../uiAlert/index";
import UIIndex from '../../ui/index'

function Step4(props)  {
    const classes = UIIndex.useStylesSteps();
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
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setStep4Output('');setStep4formula('')
    }

  return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b>Insert a formula to calculate the output</b>
                </Typography>
                <form >
                <TextField id={'step4a'} label={'Output name'} name={'Output'} autoFocus variant={'outlined'} color={'secondary'} value={step4output} onChange={step4OnBlur1}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                <Button>=</Button>
                <TextField id={'step4b'} label={'Arithmetic formula'} name={'Formula'} variant={'outlined'} color={'secondary'} value={step4formula} onChange={step4OnBlur2}
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
