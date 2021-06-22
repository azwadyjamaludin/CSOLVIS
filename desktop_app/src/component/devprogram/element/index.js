import React, {useEffect, useState} from 'react'
import MenuIndex from "./menu";
import EditorIndex from "./editor";
import VisIndex from "./visualiser";
import VisButIndex from "./visbutton";
import ConsoleIndex from "./console";
import {Grid, Paper} from "@material-ui/core";
import {useParams} from "react-router-dom";
import axios from "axios";
import insertTextAtCursor from "insert-text-at-cursor";
import Swal from "sweetalert2";

function DevElement() {
    let {params} = useParams();
    console.log(params)

    const [uploadfile, setUploadFile] = useState(''); const [filename,setFileName] = useState('')
    const [newfile,setNewFile] = useState(''); const [myParam, setMyParam] = useState('');

    let latestFile = ''; const [compileData,setCompileData] = useState(''); const [debugData,setDebugData] = useState(''); const [executeData,setExecuteData] = useState('');
    let fileName = ''; const [visopen,setVisOpen] = useState(false); let menuParam = ''
    let newFile = ''; const [visbutparam, setVisButParam] = useState('')

    const myLatestFile = (latestFileData) =>  {
        latestFile = latestFileData
        setUploadFile(latestFile)
    }
    const myNewFileValue = (newFileValue) => {
        newFile = newFileValue
        setNewFile(newFile)
    }

    const myFilename = (filenameData) => {
        fileName= filenameData
        setFileName(fileName)
    }

    const openVis = (visValue) => {
        if (visValue === 'open') {
            setVisOpen(true)
        }
    }

    const visButParam = (visValue) => {
        if (visValue === 'play') {
            setVisButParam('b 0 \\n run \\n')
        }
        if (visValue === 'next') {
            setVisButParam('n \\n')
        }
        if (visValue === 'prev') {
            setVisButParam('bt \\n')
        }
        if (visValue === 'show') {
            setVisButParam('display variable \\n')
        }
        if (visValue === 'stop') {
            setVisButParam('exit \\n')
        }
        if  (visValue === 'close') {
            setVisOpen(false)
        }
    }

    const compileResult = (compileResults) => {
        setCompileData(compileResults)
    }

    const executeResult = (executeResults) => {
        setExecuteData(executeResults)
    }

    const debugResult = (debugResults) => {
        setDebugData(debugResults)
    }

        return(
            <div>
                <MenuIndex latestFile={myLatestFile} Filename={myFilename} visOpen={openVis} compileResult={compileResult} executeResult={executeResult}
                           visualiseResult={debugResult} newFile={newfile}/>
                <br/>
                <Grid container spacing={3} direction={"row"} >
                    <Grid item xs={true}>
                        {params === 'dev'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                            ):null};
                        {params === 'button1'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button2'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button3'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button4'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button5'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button6'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button7'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button8'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button9'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                        {params === 'button10'? (
                            <EditorIndex  uploadedFile={uploadfile} myFileName={filename} newValueFile={myNewFileValue} patParam={params} />
                        ):null};
                    </Grid>
                    {visopen === true?(
                        <Grid item xs={3}>
                            <VisIndex visualiseData={debugData} debugParam={visbutparam}/>
                        </Grid>
                    ):null}
                </Grid>
                <br/>
                {visopen === true?(
                    <VisButIndex playD={visButParam} nextln={visButParam} prevln={visButParam} showV={visButParam} stopD={visButParam} visOpen={visButParam} />
                ):null}
                <br/>
                <div>
                <ConsoleIndex displayCompile={compileData} displayExecute={executeData}/>
                </div>
            </div>
            )

    }
export default DevElement
