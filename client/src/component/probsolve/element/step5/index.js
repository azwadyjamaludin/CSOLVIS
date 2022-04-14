import React, {useState} from 'react'
import {InputAdornment, Paper, Button, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import UIAlertIndex from "../../uiAlert/index";
import UIIndex from '../../ui/index.js'

function Step5(props)  {
    const classes = UIIndex.useStylesSteps();
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
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setStep5if('');setStep5do('');setStep5else('')
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b><u>CONDITIONAL ACTION</u></b>
                </Typography>
                <form >
                <TextField id={'step5a'} label={'Selection condition'} name={'Condition'} autoFocus variant={'outlined'} color={'secondary'} value={step5if} onChange={step5OnBlur1}
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
                    <UIIndex.BootstrapButton >
                        if the condition is met
                    </UIIndex.BootstrapButton>
                    &nbsp;
                <TextField id={'step5b'} label={'if-true action/formula'} name={'Action'} variant={'outlined'} color={'secondary'} value={step5do} onChange={step5OnBlur2}
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
                <TextField id={'step5c'} label={'if-false action/formula'} name={'Action'} variant={'outlined'} color={'secondary'} value={step5else} onChange={step5OnBlur3}
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
