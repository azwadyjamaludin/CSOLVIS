import React, {useState} from 'react'
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

const Step2 = (props) => {
    const [output2, setOutput2] = useState('')
    const [atypes , setAtypes] = useState('');
    const URL = `http://${sessionStorage.getItem('ipsett')}`;
    let processProp = ''; let outputProp = ''; let varProp ='';
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
            errorIPSetting(error)
        })
        setOutput2('');setAtypes('')
    }
    const errorIPSetting =(error) => {
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
                    What should be calculate?
                </Typography>
                <form >
                <TextField id={'step2'}
                           label={'Output name'}
                           name={'Output'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={output2}
                           onChange={step2OnBlur}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
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
                <TextField
                    id="selectStep2"
                    select
                    label="Types"
                    onChange={step2OnSelect}
                    helperText=""
                    value={atypes}
                    variant="outlined"
                    size={'small'}
                    style={{
                        backgroundColor: '#FFFAFA',
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
