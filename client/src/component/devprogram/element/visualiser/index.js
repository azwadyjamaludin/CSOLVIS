import React, {useState} from 'react'
import {Paper, withStyles} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/theme-terminal";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import AceEditor from "react-ace";
import {io} from "socket.io-client";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundImage: 'url('+paperImage+')',

    },
    paperBG2: {
        backgroundColor:"#faf0e6"
    },
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    input: {
        display: 'none',
    },
}));

const StyledTextField = withStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        width: '100%',
        "& .MuiInputBase-root": {
            backgroundColor: '#000000',
            color: '#f5f5f5',
            fontWeight:'bold',
            fontSize: 12,
            "& input": {
                textAlign: "left",
            }
        }
    }
}))(TextField);

const SweetAlertSetting = (error) => {
    Swal.fire({
        icon: 'error',
        title: '',
        text: `${error}`,
    }).then((r) => {
    })
}
let socketDebug = io(URL+'/debugProcessCmd',{query:{filePath:``, sesID:sessionStorage.getItem('sessionID')}})

function VisIndex(props) {
    const classes = useStyles(); const URL = `${sessionStorage.getItem('IPAddress')}`; let currPath = props.pData;

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
                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                SweetAlertSetting(error)
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
                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                SweetAlertSetting(error)
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
                <StyledTextField id={'visInput'}
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
