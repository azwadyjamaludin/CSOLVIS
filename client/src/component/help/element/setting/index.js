import React, {useState} from 'react';
import {
    InputAdornment,
    Paper,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paperBG: {
        backgroundColor:"#f5f5f5"
    },
    paperBG2: {
        backgroundColor:"#faf0e6",
    },
}));

const STIndex = () => {
    const classes = useStyles();
    const [ipadd, setIpadd] = useState('')
    const [sesID, setSesID] = useState('')

    const onBlurSett = (e) => {
        setIpadd(e.target.value)
    }

    const onClickSubmitSett = () => {
        sessionStorage.setItem('ipsett',ipadd)
    }

    const onBlurSessID = (e) => {
        setSesID(e.target.value)
    }

    const onClickSubmitSessID = () => {
        sessionStorage.setItem('sessionID',sesID)
    }

    return(
        <div align={'center'}>
            <br/>
            <Paper className={classes.paperBG2} variant={'elevation'} elevation={7}>
                <div><br/></div>&nbsp;&nbsp;
                <TextField id={'ip'}
                           label={'IP Setting'}
                           name={'ip_setting'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           value={ipadd}
                           onChange={onBlurSett}
                           helperText="Example: 192.168.1.10:3000"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 500,
                               textAlign:'left'
                           }}

                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={onClickSubmitSett}
                >
                    Submit
                </Button>
                <div><br/></div>
                <TextField id={'sesID'}
                           label={'Session ID'}
                           name={'id_session'}
                           variant={'outlined'}
                           color={'primary'}
                           value={sesID}
                           onChange={onBlurSessID}
                           helperText="Please insert your previous session ID"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 500,
                               textAlign:'left'
                           }}

                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    onClick={onClickSubmitSessID}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>
        </div>
    )
}

export default STIndex