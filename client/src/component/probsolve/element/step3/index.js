import React, {useState} from 'react'
import {Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import UIAlertIndex from "../../uiAlert/index"
import UIIndex from '../../ui/index'
import DataIndex from '../../static_data/index'

function Step3(props) {
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const classes = UIIndex.useStylesSteps();

    const [dataname,setDataname] = useState('');const [datavalue,setDatavalue] = useState('')
    const [atypes , setAtypes] = useState('');
    let inputProp = ''; let processProp = ''; let varProp = '';

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
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setDataname(''); setDatavalue(''); setAtypes('')
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b>What other data is given / needed?</b>
                </Typography>
                <form >
                <TextField id={'step3a'} label={'Data name'} name={'data_name'} autoFocus variant={'outlined'} color={'secondary'} value={dataname} onChange={step3OnBlur1}
                           helperText="Eample : Pi"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                <Button>=</Button>
                <TextField id={'step3b'} label={'Data value'} name={'data_value'} variant={'outlined'} color={'secondary'} value={datavalue} onChange={step3OnBlur2}
                           helperText="3.142"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <TextField id="selectStep3" select label="Types" color={'secondary'} onChange={step3OnSelect} variant="outlined" value={atypes}
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
