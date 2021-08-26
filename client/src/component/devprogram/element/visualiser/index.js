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

function VisIndex(props) {
    const classes = useStyles(); const URL = `${sessionStorage.getItem('IPAddress')}`;
    const next = 'next'; const prev = 'bt'; const fv = 'frame variable'; const exit = 'exit';

    const debugProcess2 = (curPath,data) => {
        try {
            let socketDebug = io(URL+'/debugProcess',{query:{filePath:`${curPath}`,command:`${data}`,sesID:sessionStorage.getItem('sessionID')}})
            console.log('filePath:',curPath,'command:',data)
            socketDebug.on('stdout', data => {
                props.visResult('\n'+data)
                socketDebug.emit('forceDisconnect')
            })
            socketDebug.on('stderr', data => {
                props.visResult('\n'+data)
                socketDebug.emit('forceDisconnect')
            })
        }catch (error) {
            SweetAlertSetting(error)
        }
    }

    let currP = props.pData;
    if (props.vbp === 'next') {
        debugProcess2(currP, next)
        props.rvbp(true)
    }
    if (props.vbp === 'bt') {
        debugProcess2(currP, prev)
        props.rvbp(true)
    }
    if (props.vbp === 'frame variable') {
        debugProcess2(currP, fv)
        props.rvbp(true)
    }
    if (props.vbp === 'exit') {
        debugProcess2(currP, exit)
        props.rvbp(true)
    }

    const onTextChange = (e) => {
        console.log(e.target.value)
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={0} className={classes.paperBG2} >
                <AceEditor id={'visualiserDisplay'}
                       readOnly={true}
                       value={props.visualiseData}
                       height={585}
                       theme={'terminal'}
                       mode={'io'}
                       fontSize={11}
                       highlightActiveLine={false}
                       showGutter={false}
                       showPrintMargin={false}
                       focus={true}
                       style={{
                           width:'100%',
                           border:'none',
                           outline:'none'
                       }}
                       onLoad={(editor) => {
                           editor.getSession().setUseWrapMode(true);
                       }}
                />
                <StyledTextField id={'visInput'}
                                 readOnly={false}
                                 multiline={false}
                                 placeholder={'Click visualiser button to navigate'}
                                 onChange={onTextChange}
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
