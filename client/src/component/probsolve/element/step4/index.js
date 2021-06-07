import React, {useEffect, useState} from 'react'
import {
    Paper
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const Step4 = ({process,formula}) => {
    const classes = useStyles();
    const [step4output,setStep4Output] = useState(''); const [step4formula, setStep4formula] = useState('')

    const step4OnBlur1 = (e) => {
        setStep4Output(e.target.value)
    }

    const step4OnBlur2 = (e) => {
        setStep4formula(e.target.value)
    }

    const step4OnClickSubmit = () => {
        process.append(step4output+''+'='+''+step4formula)
        formula.append(step4output+''+'='+''+step4formula)
        setStep4Output('');setStep4formula('')
    }

  return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    Insert a formula to calculate the output
                </Typography>
                <TextField id={'step4a'}
                           label={'Output name'}
                           name={'Output'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={step4output}
                           onChange={step4OnBlur1}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                />
                <Button>=</Button>
                <TextField id={'step4b'}
                           label={'Arithmetic formula'}
                           name={'Formula'}
                           variant={'outlined'}
                           color={'primary'}
                           value={step4formula}
                           onChange={step4OnBlur2}
                           helperText="PI * jejari * jejari"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
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
            </Paper>
        </div>
    )
}
export default Step4
