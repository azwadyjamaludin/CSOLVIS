import React, {useState} from 'react';
import {Paper, TextField, Button} from "@material-ui/core";
import axios from "axios";
import UIIndex from "../../ui/index"

const STIndex = () => {
    const classes = UIIndex.useStyles(); const [lastSesID, setLastSesID] = useState(''); const [ipAdd, setIpAdd] = useState('');

    const onBlurIPAdd = (e) => {
        setIpAdd(e.target.value)
    }
    const onClickSubmitIPAdd = async () => {
        const body = {ipAddress:ipAdd}
        console.log('ipAdd:',ipAdd)
        await axios.post(ipAdd+'/routes/dataMgt/storeIPAddress',body).then((res) => {
            const data = res.data
            sessionStorage.setItem('IPAddress',data.ipAddress)
        })
    }

    const onBlurSessID = (e) => {
        setLastSesID(e.target.value)
    }

    const onClickSubmitSessID = () => {
        sessionStorage.setItem('sessionID',lastSesID)
    }

    return(
        <div align={'center'}>
            <br/>
            <Paper className={classes.paperBG2} variant={'elevation'} elevation={7}>
                <div><br/></div>
                <TextField id={'ip'}
                           label={'IP Setting'}
                           name={'ip_setting'}
                           autoFocus
                           variant={'outlined'}
                           color={'secondary'}
                           value={ipAdd}
                           onChange={onBlurIPAdd}
                           helperText="Example: http://192.168.1.10:3002"
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
                    onClick={onClickSubmitIPAdd}
                >
                    Submit
                </Button>
                <div><br/></div>
                <div><br/></div>&nbsp;&nbsp;
                <TextField id={'sesID'}
                           label={'Session ID'}
                           name={'id_session'}
                           variant={'outlined'}
                           color={'secondary'}
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
