import React, {useState} from 'react'
import {InputAdornment, Paper, Button, TextField, Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import UIAlertIndex from "../../uiAlert/index"
import UIIndex from '../../ui/index'
import DataIndex from '../../static_data/index'

const Step2 = (props) => {
    const [output2, setOutput2] = useState('')
    const [atypes , setAtypes] = useState('');
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    let processProp = ''; let outputProp = ''; let varProp ='';
    const classes = UIIndex.useStylesSteps();

    const step2OnBlur = (e) => {
        setOutput2(e.target.value)

    }

    const step2OnSelect = (e) => {
        setAtypes(e.target.value)
    }

    const step2OnClickSubmit = async() => {
        outputProp = output2
        processProp = 'Calculate'+' '+output2
        varProp =  atypes+' '+output2+';'
        const data = {sessionID:sessionStorage.getItem('sessionID'),output:outputProp,process:processProp,variable:varProp}
        await axios.post(URL+'/routes/dataMgt/step2',data).then((res) => {
            props.IPOData(res.data.ipo)
        }).catch(function (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setOutput2('');setAtypes('')
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b>What should be calculate?</b>
                </Typography>
                <form >
                <TextField id={'step2'} label={'Output name'} name={'Output'} autoFocus variant={'outlined'} color={'secondary'} value={output2} onChange={step2OnBlur}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       Calculate
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;&nbsp;
                <TextField id="selectStep2" select label="Types" color={'secondary'} onChange={step2OnSelect} helperText="" value={atypes} variant="outlined"
                    size={'small'}
                    style={{
                        backgroundColor: '#f5f5f5',
                        width: 190,
                        textAlign:'left'
                    }}
                >
                    {DataIndex.types.map((option) => (
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
                    onClick={step2OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
                </form>
            </Paper>
        </div>
    )
}
export default Step2
