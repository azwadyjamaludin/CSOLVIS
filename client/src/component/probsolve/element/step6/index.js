import React, {useState} from 'react'
import {Paper, TextField, Button, Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import UIAlertIndex from "../../uiAlert/index";
import UIIndex from '../../ui/index'
import DataIndex from '../../static_data/index'

function Step6(props) {
    const classes = UIIndex.useStylesSteps();
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [step6counter,setStep6counter] = useState(''); const [step6repeat,setStep6repeat] = useState('')
    const [atypes , setAtypes] = useState('')
    let processProp = ''; let varProp = ''

    const step6Blur1 = (e) => {
        setStep6counter(e.target.value)
    }

    const step6OnSelect = (e) => {
        setAtypes(e.target.value)
    }

    const step6Blur2 = (e) => {
        setStep6repeat(e.target.value)
    }

    const step6OnClickSubmit = async() => {
        varProp = atypes+' '+step6counter+';'
        processProp = 'Repeat for'+' '+step6repeat
        const data = {process:processProp,variable:varProp,sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/step6', data).then((res)=> {
            props.IPOData(res.data.ipo)
        }).catch(function (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
        setStep6counter('');setAtypes('');setStep6counter('')
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG2}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <b><u>REPEATING ACTION</u></b>
                </Typography>
                <form  >
                <UIIndex.BootstrapButton >
                    Name of counter
                </UIIndex.BootstrapButton>
                &nbsp;
                <TextField id={'step6a'} label={'counter'} name={'Counter'} autoFocus variant={'outlined'} color={'secondary'} value={step6counter} onChange={step6Blur1}
                           helperText="Example : x"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                &nbsp;&nbsp;
                <TextField id="selectStep6" select label="Types" onChange={step6OnSelect} variant="outlined" value={atypes}
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
                <br/><br/>
                <UIIndex.BootstrapButton >
                    Repeat for
                </UIIndex.BootstrapButton>
                &nbsp;
                <TextField id={'step6b'} label={'repeat condition'} name={'Condition'} variant={'outlined'} color={'secondary'} value={step6repeat} onChange={step6Blur2}
                           helperText="Example : x < 10"
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
                    onClick={step6OnClickSubmit}
                >
                    Submit
                </Button>
                <div><br/></div>
                </form>
            </Paper>
        </div>
    )
}
export default Step6
