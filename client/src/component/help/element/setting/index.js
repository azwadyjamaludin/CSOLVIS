import React, {useState} from 'react';
import {
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
    //const [ipadd, setIpadd] = useState('')
    const [lastSesID, setLastSesID] = useState('')

    /*const onBlurSett = (e) => {
        setIpadd(e.target.value)
    }

    const onClickSubmitSett = () => {
        sessionStorage.setItem('ipsett',ipadd)
    }*/

    const onBlurSessID = (e) => {
        setLastSesID(e.target.value)
    }

    const onClickSubmitSessID = () => {
        sessionStorage.setItem('sessionID',lastSesID)
    }

    return(
        <div align={'center'}>
            <br/>
            <Paper className={classes.paperBG} variant={'elevation'} elevation={7}>
                <div><br/></div>&nbsp;&nbsp;
                {/*<TextField id={'ip'}
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
                               backgroundColor: '#f5f5f5',
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
                <div><br/></div>*/}
                <TextField id={'sesID'}
                           label={'Session ID'}
                           name={'id_session'}
                           variant={'outlined'}
                           color={'primary'}
                           value={lastSesID}
                           onChange={onBlurSessID}
                           helperText="Please insert your copied session ID to retrieve previous data (if any)"
                           size={'small'}
                           style={{
                               backgroundColor: '#f5f5f5',
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
