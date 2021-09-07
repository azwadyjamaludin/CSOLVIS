import React from 'react'
import {Paper, withStyles} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import "ace-builds/src-noconflict/mode-io";
import "ace-builds/src-noconflict/theme-terminal";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import AceEditor from "react-ace";
import {io} from "socket.io-client";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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

function VisIndex(props) {
    const classes = useStyles(); const URL = `${sessionStorage.getItem('IPAddress')}`;

    const debugProcess = (currP) => {
        try {
            socketDebug = io(URL+'/debugProcess',{query:{filePath:`${currP}`, sesID:sessionStorage.getItem('sessionID')}})
                socketDebug.on('stdout', data => {
                    props.visResult('\n'+data)
                })
                socketDebug.on('stderr', data => {
                    props.visResult('\n'+data)
                })
        }catch (error) {
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                SweetAlertSetting(error)
            }
        }
    }
    let currPath = ''; let cmd = '';
    let socketDebug = io(URL+'/debugProcess',{query:{filePath:`${currPath}`,command:`${cmd}`,sesID:sessionStorage.getItem('sessionID')}})

    if (props.myDd === 'd') {
        currPath = props.pData;
        debugProcess(currPath)
        props.rMyDd(true)
    }

    if (props.vbp === 'next'||props.vbp === 'up'||props.vbp === 'frame variable'||props.vbp === 'exit') {
        currPath = props.pData; cmd = props.vbp
        debugProcess(currPath)
        socketDebug.emit('cmd', cmd)
        props.rvbp(true)
    }

    const onTextChange = (e) => {
        console.log(e.target.value)
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
