import React, {useEffect, useRef, useState} from 'react'
import {
    Paper
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import insertTextAtCursor from 'insert-text-at-cursor';
import AceEditor from "react-ace";

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

const editorStyle = {
    border: '2px solid lightgray',
};

function VisIndex(props) {
    const classes = useStyles(); const tfRef = useRef(); const curPos = 0

    let newFile = props.visualiseData;

     const debugArgs = (editor) => {
            insertTextAtCursor(editor,props.debugParam)
     }

    function onEditorChange(newValue) {
        newFile = newValue
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={0} className={classes.paperBG} >
                <AceEditor
                    name={'AceVisualiser'}
                    style={editorStyle}
                    readOnly={false}
                    mode={'javascript'}
                    theme={'terminal'}
                    width="100%"
                    height={'620px'}
                    focus={false}
                    value={props.visualiseData}
                    onChange={onEditorChange}
                    highlightActiveLine
                    showGutter={false}
                    showPrintMargin={false}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        showLineNumbers: false,
                        enableSnippets: false,
                        tabSize: 2,
                    }}
                    onLoad={(editor) => {
                        editor.getSession().setUseWrapMode(true);
                        debugArgs(editor)
                    }}
                />
            </Paper>
        </div>
    )
}
export default VisIndex
