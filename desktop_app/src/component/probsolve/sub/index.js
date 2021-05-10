import React, {useEffect, useState} from 'react'
import {InputAdornment, InputBase, Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


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
}));

const ProbDes = ({st1,st2}) => {
    const classes = useStyles();
    const types = [
        {
            value: 'char',
            label: 'char',
        },
        {
            value: 'int',
            label: 'int',
        },
    ];
    const [step1,setStep1] = useState(false)
    const [step2,setStep2] = useState(false)

    useEffect(() => {
       set1()
       set2()
    },[])

    const set1 = () => {
        setStep1(st1)
    }

    const set2 = () => {
        setStep2(st2)
    }

    return(
        <div align={'center'}>
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    Each step can be <b>REPEATED</b> or <b>IGNORED</b> if not related.
                </Typography>
            </Paper>
            {step1 == true ?(
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    What data will you get from user?
                </Typography>
                <TextField id={'step1'}
                           label={'Step1'}
                           name={'Input'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           //value={this.state.title}
                           // onChange={this.onChangeTitle}
                           //margin={'normal'}
                           helperText=""
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
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
                <TextField
                    id="selectStep1"
                    select
                    label="Types"
                    value={types}
                    //onChange={handleChange}
                    helperText=""
                    variant="outlined"
                    //margin={'normal'}
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
                    //disabled={this.state.buttonDisable === true}
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    //onClick={this.saveDetails.bind(this)}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>):(null)}
            {step2 == true ? (
            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    What should you calculate?
                </Typography>
                <TextField id={'step2'}
                           label={'Step2'}
                           name={'Input'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                    //value={this.state.title}
                    // onChange={this.onChangeTitle}
                    //margin={'normal'}
                           helperText=""
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
                    value={types}
                    //onChange={handleChange}
                    helperText=""
                    variant="outlined"
                    //margin={'normal'}
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
                    //disabled={this.state.buttonDisable === true}
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    //onClick={this.saveDetails.bind(this)}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>):(null)}

        </div>
    )

}
export default ProbDes
