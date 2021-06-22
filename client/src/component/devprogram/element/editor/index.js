import React, {useEffect, useRef, useState} from 'react'
import {
    Paper, Backdrop, Grid
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import axios from "axios";
import Swal from "sweetalert2";
import insertTextAtCursor from "insert-text-at-cursor";

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

function EditorIndex (props) {

    const classes = useStyles(); //const aceRef = useRef()

    let newFile = '';
    let varsProp = []; let formulasProp = []; const URL = `http://${sessionStorage.getItem('ipsett')}`;

    let include = "#include"; let stdio = "stdio.h"; let main = "int main() "; let n = "\n"; let return0 = "return 0 "; let insertText = "Insert your text here"; let varText = "variable"
    let stdioButton = `${include} ${'<'}${stdio}${'>'}` ; let mainButton = `${main} {${n}${n}${n}${return0}}`; let printfButton = `printf(${insertText.italics()});`; let scanfButton = `scanf(%v,${varText.italics()});`;
    let ifElseButton = `if(${'<'.italics()}${'selection condition'.italics()}${'>'.italics()}) {${n}${'if-true action/formula'.italics()}${n}} else() {${'if-false action/formula'.italics()}${n}}`;
    let forLoopButton = `for (${'<'.italics()}${"counter".italics()}${">".italics()}=0;${'<'.italics()}${"repeat condition".italics()}${'>'.italics()};${'<'.italics()}${"counter++".italics()}${'>'.italics()}) {${n}${n}}`
    let whilebutton = `while(${'<'.italics()}${"repeat condition".italics()}${'>'.italics()}) {${n}${n}}`; let doWhileButton = `do{${n}${n}}while(${'<'.italics()}${"repeat condition".italics()}${'>'.italics()});`

    const data = {sessionID: sessionStorage.getItem('sessionID')}
    axios.post(URL + '/routes/dataMgt/getVarsAndFormulas', data).then((res) => {
        varsProp = res.data.variable; formulasProp = res.data.formula
        console.log(varsProp,formulasProp)
    }).catch(function (error) {
        errorIPSetting(error)
    })

    const errorIPSetting =(error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
        })
    }

    const butPattern = (editor) => {
        console.log('AceEditor-butPattern:',editor)

        if (props.patParam === 'button1') {
            insertTextAtCursor(editor, stdioButton)
            console.log('insertTextAtCursor-button1',stdioButton)
        }
        if(props.patParam === 'button2') {
            insertTextAtCursor(editor, mainButton)
        }
        if (props.patParam === 'button3') {
            for (let varData of varsProp) {
                insertTextAtCursor(editor, varData)
            }
        }
        if (props.patParam === 'button4') {
            for (let formulaData of formulasProp) {
                insertTextAtCursor(editor, formulaData)
            }
        }
        if (props.patParam === 'button5') {
            insertTextAtCursor(editor, printfButton)
        }
        if (props.patParam === 'button6') {
            insertTextAtCursor(editor, scanfButton)
        }
        if (props.patParam === 'button7') {
            insertTextAtCursor(editor, ifElseButton)
        }
        if (props.patParam === 'button8') {
            insertTextAtCursor(editor, forLoopButton)
        }
        if (props.patParam === 'button9') {
            insertTextAtCursor(editor, whilebutton)
        }
        if (props.patParam === 'button10') {
            insertTextAtCursor(editor, doWhileButton)
        }
    }

    newFile = props.uploadedFile
    props.newValueFile(newFile)
    console.log(newFile)
    function onEditorChange(newValue) {
        if (!newValue) {
        newFile = props.uploadedFile
        props.newValueFile(newFile)
        }else {
            newFile = newValue
            props.newValueFile(newFile)
        }
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                <Typography variant={'body2'} className={classes.margin} paragraph={true} align={'center'}>
                    <br/>
                    <b>Editor</b>
                    <br/>
                    {props.myFileName !== 'Untitled.c' ? (
                        <p>{props.myFileName}</p>
                    ):null}
                </Typography>
                <AceEditor
                    name={'AceEditor'}
                    style={editorStyle}
                    readOnly={false}
                    //ref={aceRef}
                    theme={'xcode'}
                    mode="c_cpp"
                    width="99%"
                    //focus={true}
                    value={props.uploadedFile}
                    onChange={onEditorChange}
                    highlightActiveLine
                    showGutter={true}
                    showPrintMargin={false}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        tabSize: 2,
                    }}
                    onLoad={(editor) => {
                        editor.focus();
                        editor.getSession().setUseWrapMode(true);
                        butPattern(editor)

                    }}
                />
                <br/>
            </Paper>
        </div>
    )
}
export default EditorIndex
