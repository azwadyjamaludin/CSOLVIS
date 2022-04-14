import {Paper, Typography} from "@material-ui/core";
import React, {useState} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-terminal";
import {io} from 'socket.io-client'
import UIIndex from "../../ui/index.js"
import UiAlertIndex from "../../uiAlert/index";

let socketExec = io(URL+'/executeProcess',{query:{filePath:``, sesID:sessionStorage.getItem('sessionID')}})

function ConsoleIndex(props) {
    const classes = UIIndex.useStylesElements(); const [kid, setKid] = useState(''); const URL = `${sessionStorage.getItem('IPAddress')}`; let cmd = '';


    const onTextChange = (e) => {
        setKid(e.target.value)
    }

    const onPressEnter = (e) => {
        if (e.key === 'Enter') {
            cmd = kid
            executeProcessCmd(socketExec,cmd)
        }
    }

    const executeProcess = (socketExec) => {
        try {
            socketExec.on('stdout', data => {
                props.consResult('\n'+data)
            })
            socketExec.on('stderr', data => {
                props.consResult('\n'+data)
            })
            props.rMyXd(true)
        }catch(error) {
            if (!error.status) {
                UiAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UiAlertIndex.SweetAlertSetting(error)
            }
        }
    }

    const executeProcessCmd = (socketExec,cmd) => {
        try {
            socketExec.emit('cmd',cmd)
            socketExec.on('stdout', data => {
                props.consResult('\n'+data)
            })
            socketExec.on('stderr', data => {
                props.consResult('\n'+data)
            })
            setKid('')
        }catch(error) {
            if (!error.status) {
                UiAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UiAlertIndex.SweetAlertSetting(error)
            }
        }
    }

    if (props.myXd === 'x') {
        socketExec = io(URL+'/executeProcess',{query:{filePath:`${props.pData}`, sesID:sessionStorage.getItem('sessionID')}})
        executeProcess(socketExec)
    }

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <Typography variant={'body2'} className={classes.margin} paragraph={false} align={'center'}>
                <br/>
                <b>Console</b>
                <br/>
            </Typography>
            <AceEditor id={'consoleDisplay'}
                       readOnly={false}
                       focus={false}
                       value={props.displayData}
                       fontSize={12}
                       height={230}
                       theme={'terminal'}
                       highlightActiveLine={false}
                       showGutter={false}
                       showPrintMargin={false}
                       style={{
                           color: '#f5f5f5',
                           fontWeight:'bold',
                           width:'100%',
                           border:'none',
                           outline:'none'
                       }}
                       onLoad={(editor) => {
                           editor.getSession().setUseWrapMode(true);
                           editor.navigateLineEnd()
                       }}
            />
            {props.stfOpen === true ? (
            <UIIndex.StyledTextField id={'consoleInput'}
                   readOnly={false}
                   multiline={false}
                   autoFocus
                   placeholder={'Type here and press enter'}
                   value={kid}
                   onChange={onTextChange}
                   onKeyPress={onPressEnter}
                   style={{
                       border:'none',
                       outline:'none'
                   }}
            />):null}
        </Paper>
    )
}
export default ConsoleIndex
