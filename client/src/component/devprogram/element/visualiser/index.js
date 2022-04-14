import React from 'react'
import {Paper} from "@material-ui/core";
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/theme-terminal";
import AceEditor from "react-ace";
import {io} from "socket.io-client";
import UIIndex from "../../ui/index"
import UIAlertIndex from "../../uiAlert/index"

let socketDebug = io(URL+'/debugProcessCmd',{query:{filePath:``, sesID:sessionStorage.getItem('sessionID')}})

function VisIndex(props) {
    const classes = UIIndex.useStylesElements(); const URL = `${sessionStorage.getItem('IPAddress')}`; let currPath = props.pData;

    const debugProcess = (socketDebug) => {
        try {
            socketDebug.on('stdout', data => {
                props.visResult('\n'+data)
            })
            socketDebug.on('stderr', data => {
                props.visResult('\n'+data)
            })
            props.rMyDd(true)
        }catch (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        }
    }

    const debugProcessCmd = (socketDebug,cmd) => {
        try {
            socketDebug.emit('cmd',cmd)
            socketDebug.on('stdout', data => {
                props.visResult('\n'+data)
            })
            socketDebug.on('stderr', data => {
                props.visResult('\n'+data)
            })
            props.rvbp(true)
        }catch (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        }
    }

    if (props.myDd === 'd') {
        socketDebug = io(URL+'/debugProcess',{query:{filePath:`${currPath}`, sesID:sessionStorage.getItem('sessionID')}})
        debugProcess(socketDebug)
    }

    if (props.vbp) {
        debugProcessCmd(socketDebug,props.vbp)
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={0} className={classes.paperBG2} >
                <AceEditor id={'visualiserDisplay'}
                       readOnly={false}
                       value={props.visualiseData}
                       height={564}
                       width="99%"
                       theme={'terminal'}
                       mode={'io'}
                       fontSize={12}
                       highlightActiveLine={false}
                       showGutter={false}
                       showPrintMargin={false}
                       focus={false}
                       style={{
                           width:'100%',
                           fontWeight:'bold',
                           border:'none',
                           outline:'none'
                       }}
                       onLoad={(editor) => {
                           editor.getSession().setUseWrapMode(true);
                           editor.navigateLineEnd()
                       }}
                />
                <UIIndex.StyledTextField id={'visInput'}
                                 readOnly={true}
                                 multiline={false}
                                 placeholder={'Click visualiser button to navigate'}
                                 value={props.vbp}
                                 style={{
                                     border:'none',
                                     outline:'none'
                                 }}
                />
            </Paper>
        </div>
    )
}
export default VisIndex
