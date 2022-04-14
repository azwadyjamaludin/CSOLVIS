import React from 'react'
import {Paper, Typography} from "@material-ui/core";
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools"
import insertTextAtCursor from "insert-text-at-cursor";
import UIIndex from "../../ui/index"

const editorStyle = {
    border: '2px solid lightgray',
};

function EditorIndex (props) {

    const classes = UIIndex.useStylesElements();

    let newFile = props.uploadedFile;

    let n = "\n";
    let stdioButton = `${'  #include'} ${'<'}${'stdio.h'}${'>'}` ; let mainButton = `${n}  ${'int main()'} {`;let mainButton2 = ` ${'return 0'}${';'}${n}  }`; let printfButton = `${n}  printf(${'insert your text here'});`; let scanfButton = `${n}  scanf(%v,${'variable'});`;
    let ifElseButton = `${n}  if(${'selection condition'}) {${n}${n}  ${'if-true action/formula'}${n}${n}  } ${n}  else() {${n}${n}  ${'if-false action/formula'}${n}${n}  }`;
    let forLoopButton = `${n}  for (${"counter"}=0;${"repeat condition"};${"counter++"}) {${n}${n}  }`
    let whilebutton = `${n}  while(${"repeat condition"}) {${n}${n}  }`; let doWhileButton = `${n}  do{${n}${n}  }${n}  while(${"repeat condition"});`


    const stdio = stdioButton; const main = mainButton; const main2 = mainButton2; const printf = printfButton; const scanf = scanfButton; const ifElse = ifElseButton; const forLoop = forLoopButton;
    const While = whilebutton; const doWhile = doWhileButton;

    const butPattern = (editor) => {

        if (props.myparam === 'button1') {
            insertTextAtCursor(editor, stdio)
        }
        if(props.myparam === 'button2-1') {
            insertTextAtCursor(editor, main)
        }
        if(props.myparam === 'button2-2') {
            insertTextAtCursor(editor, main2)
        }
        if (props.myparam === 'button3') {
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
    }

    return(
        <div>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
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
                    theme={'xcode'}
                    mode="c_cpp"
                    height={460}
                    width="99%"
                    focus={false}
                    fontSize={11}
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
