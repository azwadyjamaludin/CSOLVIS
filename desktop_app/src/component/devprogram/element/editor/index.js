import React, {useEffect, useState} from 'react'
import {
    Paper,Backdrop
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import * as ace from "ace-builds";

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

const editorStyle = {
    border: '2px solid lightgray',
};

const EditorIndex = ({uploadedFile,filename,pat}) => {
    const classes = useStyles();
    let editor = ace.edit()
    let cursorPosition = editor.getCursorPosition()

    const onEditorChange = (newValue) => {
        uploadedFile(newValue)

    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                <Typography variant={'body2'} className={classes.margin} paragraph={true} align={'center'}>
                    <br/>
                    <b>Editor</b>
                    <br/>
                    {filename !== '' ? (
                        <p>{filename}</p>
                    ):(<p>Untitled.c</p>)}
                </Typography>
                <AceEditor
                    name={'ace-editor'}
                    style={editorStyle}
                    readOnly={false}
                    value={uploadedFile}
                    theme={'xcode'}
                    mode="c_cpp"
                    width="100%"
                    onChange={onEditorChange}
                    highlightActiveLine
                    showGutter={true}
                    showPrintMargin={false}
                    editorProps={{
                        $blockScrolling: true,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}

                />
            </Paper>
        </div>
    )
}
export default EditorIndex