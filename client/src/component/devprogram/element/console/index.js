import {Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/mode-javascript";
import AceEditor from "react-ace";
import Typography from "@material-ui/core/Typography";

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

function ConsoleIndex(props) {
    const classes = useStyles(); const showMsg = () => 'Hello World'
    let newFile = props.displayData;

    function onEditorChange(newValue) {
        props.constyping = newValue
    }

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <Typography variant={'body2'} className={classes.margin} paragraph={false} align={'center'}>
                <br/>
                <b>Console</b>
                <br/>
            </Typography>
            <AceEditor
                name={'AceConsole'}
                readOnly={true}
                mode={'javascript'}
                theme={'terminal'}
                width="100%"
                height={'280px'}
                focus={false}
                value={props.displayData}
                showGutter={false}
                showPrintMargin={false}
                highlightActiveLine={false}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    showLineNumbers: false,
                    enableSnippets: false,
                    tabSize: 2,
                }}
                onLoad={(editor) => {
                    editor.getSession().setUseWrapMode(true);

                }}
            />
            <AceEditor
                name={'AceConsoleInput'}
                readOnly={false}
                mode={'javascript'}
                theme={'terminal'}
                width="100%"
                placeholder={'Input command / arguments here'}
                focus={true}
                onChange={onEditorChange}
                showGutter={false}
                showPrintMargin={false}
                highlightActiveLine={false}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    showLineNumbers: false,
                    enableSnippets: false,
                    tabSize: 2,
                    maxLines:1
                }}
                onLoad={(editor) => {
                    editor.getSession().setUseWrapMode(true);

                }}
            />
        </Paper>
    )
}
export default ConsoleIndex
