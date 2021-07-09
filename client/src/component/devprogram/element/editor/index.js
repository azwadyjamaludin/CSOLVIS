import React, {useEffect, useRef, useState} from 'react'
import {
    Paper
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
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

    const classes = useStyles(); const aceRef = useRef();

    let newFile = props.uploadedFile;

    let n = "\n";
    let stdioButton = `${'#include'} ${'<'}${'stdio.h'}${'>'}` ; let mainButton = `${n}${'int main()'} {${n}${n}${n}${'return 0'}${n}}`; let printfButton = `${n}printf(${'insert your text here'});`; let scanfButton = `${n}scanf(%v,${'variable'});`;
    let ifElseButton = `${n}if(${'selection condition'}) {${n}${n}${'if-true action/formula'}${n}${n}} ${n}else() {${n}${n}${'if-false action/formula'}${n}${n}}${n}`;
    let forLoopButton = `${n}for (${"counter"}=0;${"repeat condition"};${"counter++"}) {${n}${n}}`
    let whilebutton = `${n}while(${"repeat condition"}) {${n}${n}}`; let doWhileButton = `${n}do{${n}${n}}${n}while(${"repeat condition"});`


    const stdio = stdioButton; const main = mainButton; const printf = printfButton; const scanf = scanfButton; const ifElse = ifElseButton; const forLoop = forLoopButton;
    const While = whilebutton; const doWhile = doWhileButton; const myVars = props.myVars; const myFormulas = props.myFormulas;

    const butPattern = (editor) => {
        console.log('EditorIndex-butPattern:',editor)


        if (props.myparam === 'button1') {
            insertTextAtCursor(editor, stdio)
            console.log('insertTextAtCursor-button1',stdioButton)
        }
        if(props.myparam === 'button2') {
            insertTextAtCursor(editor, main)
        }
        if (props.myparam === 'button3') {
            console.log('insertTextAtCursor-button3',props.myVars.replace(',',' '))
            insertTextAtCursor(editor,props.myVars.replace(',',' '))

        }
        if (props.myparam === 'button4') {
            insertTextAtCursor(editor, props.myFormulas.replace(',',' '))
        }
        if (props.myparam === 'button5') {
            insertTextAtCursor(editor, printf)
        }
        if (props.myparam === 'button6') {
            insertTextAtCursor(editor, scanf)
        }
        if (props.myparam === 'button7') {
            insertTextAtCursor(editor, ifElse)
        }
        if (props.myparam === 'button8') {
            insertTextAtCursor(editor, forLoop)
        }
        if (props.myparam === 'button9') {
            insertTextAtCursor(editor, While)
        }
        if (props.myparam === 'button10') {
            insertTextAtCursor(editor, doWhile)
        }
    }

    const onEditorChange = (newValue) => {
            newFile = newValue
            props.newValueFile(newFile)
            console.log(newFile)
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                <Typography variant={'body2'} className={classes.margin} paragraph={true} align={'center'}>
                    <br/>
                    <b>Editor</b>
                    <br/>
                    {props.myFileName.length > 0 ? (
                        <p>{props.myFileName}</p>
                    ):null}
                </Typography>
                <AceEditor
                    name={'AceEditor'}
                    style={editorStyle}
                    readOnly={false}
                    ref={aceRef}
                    theme={'xcode'}
                    mode="c_cpp"
                    width="99%"
                    focus={false}
                    value={props.uploadedFile}
                    onChange={onEditorChange}
                    highlightActiveLine={false}
                    showGutter={true}
                    showPrintMargin={false}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: true,
                        showLineNumbers : true,
                        enableSnippets: true,
                        tabSize: 2,
                    }}
                    onLoad={(editor) => {
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
