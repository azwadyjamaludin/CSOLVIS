import React, {useRef, useState} from 'react'
import {
    Paper, withStyles
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import insertTextAtCursor from 'insert-text-at-cursor';
import AceEditor from "react-ace";
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
        "& .MuiInputBase-root": {
            color: '#f5f5f5',
            "& input": {
                textAlign: "left"
            }
        }
    }
}))(TextField);

function VisIndex(props) {
    const classes = useStyles(); const [args, setArgs] = useState(''); const inputRef = useRef();

     const debugArgs = (editor) => {
            insertTextAtCursor(editor,props.debugParam)
     }

    const onPressEnter = (e) => {
        if (e.keyCode === 13) {
            props.visualiseData.append(debugArgs())
            setArgs('')
        }
    }

    const onTextChange = (newValue) => {
        setArgs(newValue)
        onPressEnter()
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={0} className={classes.paperBG} >
                <AceEditor
                    name={'AceVisualiser'}
                    readOnly={false}
                    mode={'javascript'}
                    theme={'terminal'}
                    width="100%"
                    height={'610px'}
                    focus={true}
                    value={props.visualiseData}
                    onChange={onTextChange}
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
                        debugArgs(editor)
                    }}
                />
            </Paper>
        </div>
    )
}
export default VisIndex
