import React, {useState} from 'react'
import {InputAdornment, Paper, Button, Typography, TextField} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import UIIndex from '../../ui/index'
import UIAlertIndex from "../../uiAlert/index"
import DataIndex from '../../static_data/index'

function Step1(props)  {
    const [input, setInput] = useState(''); const [atypes, setAtypes] = useState('')
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    let inputProp = ''; let processProp = ''; let varProp = '';
    const classes = UIIndex.useStylesSteps();

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
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setInput(''); setAtypes('');
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b>What data will you get from user?</b>
                </Typography>
                <form >
                <TextField id={'step1'} label={'Input name'} name={'Input'} autoFocus variant={'outlined'} color={'secondary'} value={input} onChange={step1OnBlur}
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
                <TextField id="selectStep1" select label="Types" color={'secondary'} onChange={step1OnSelect} helperText="" variant="outlined" value={atypes}
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
