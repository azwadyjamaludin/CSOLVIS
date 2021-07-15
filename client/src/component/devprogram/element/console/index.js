import {Paper, withStyles} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/mode-javascript";
import AceEditor from "react-ace";
import Typography from "@material-ui/core/Typography";
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
    }
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

function ConsoleIndex(props) {
    const classes = useStyles(); const [args, setArgs] = useState('');

    const onPressEnter = (e) => {
        if (e.keyCode === 13) {
            props.displayData.append(e.target.value+'\n')
            setArgs('')
        }
    }

    const onTextChange = (newValue) => {
        setArgs(newValue)
        onPressEnter()
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
                readOnly={false}
                mode={'javascript'}
                theme={'terminal'}
                width="100%"
                height={'270px'}
                focus={true}
                value={props.displayData}
                showGutter={false}
                showPrintMargin={false}
                highlightActiveLine={false}
                onChange={onTextChange}
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
        </Paper>
    )
}
export default ConsoleIndex
