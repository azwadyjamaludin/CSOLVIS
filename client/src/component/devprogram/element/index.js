import React, {useEffect, useState} from 'react'
import MenuIndex from "./menu";
import EditorIndex from "./editor";
import VisIndex from "./visualiser";
import VisButIndex from "./visbutton";
import ConsoleIndex from "./console";
import {Grid, Paper} from "@material-ui/core";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function DevElement() {
    let {params} = useParams();
    console.log(params)

    const [filename,setFileName] = useState(''); const [newfile,setNewFile] = useState(''); const [vars, setVars] = useState(''); const [formulas, setFormulas] = useState('')
    const [consoleData,setConsoleData] = useState(''); const [debugData,setDebugData] = useState('');

    let fileName = ''; const [visopen,setVisOpen] = useState(false); let compiledata = ''; let executedata = ''; let debugdata = ''; let filenamedata = '';
    let newFile = ''; const [visbutparam, setVisButParam] = useState('');  const [saveFile, setSaveFile] = useState(false)

    useEffect(() => {
        getVarsAndFormulas()
        getStoredFileData()
        return() => {
            setSaveFile(true)
        }
    },[])


    const URL = `http://${sessionStorage.getItem('ipsett')}`;

    const getVarsAndFormulas = () => {
        if (sessionStorage.getItem('sessionID') != null) {
        const data = {sessionID: sessionStorage.getItem('sessionID')}
        axios.post(URL + '/routes/dataMgt/getVarsAndFormulas', data).then((res) => {
            if (res.data.emptyData) {
                SweetAlertSetting('No data found in the given session, Please create a new session or you may try to insert the previous session id (Help/setting)')
            } else {
            setVars(res.data.variable)
            setFormulas(res.data.formula)
            }
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
        }
    }

    const SweetAlertSetting =(error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
        })
    }

    const getStoredFileData = () => {
        const data = {sessionID: sessionStorage.getItem('sessionID') }
        axios.post(URL+'/routes/fileMgt/getStoredData', data).then((res) => {
                if (res.data.fileContents === 'enoent') {
                    SweetAlertSetting('No file found for the given session. Please create a new session and save a new file or you may try to insert the previous session id (Help/setting)')
                } else if (res.data.fileContents === 'something wrong somewhere') {
                    SweetAlertSetting('Something got wrong!!')
                } else {
                newFile = res.data.fileContents; filenamedata = res.data.fileName;
                setNewFile(newFile); setFileName(filenamedata)
                }
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
    }

    const myLatestFile = (latestFileData) =>  {
        newFile = latestFileData
        setNewFile(newFile)
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
            setVisButParam('breakpoint set --line 1\n run\n continue\n')
        }
        if (visValue === 'next') {
            setVisButParam('n\n')
        }
        if (visValue === 'prev') {
            setVisButParam('up\n')
        }
        if (visValue === 'show') {
            setVisButParam('frame variable\n')
        }
        if (visValue === 'stop') {
            setVisButParam('exit\n yes\n')
        }
        if  (visValue === 'close') {
            setVisOpen(false)
        }
    }

    const compileResult = (compileResults) => {
        compiledata = compileResults
        setConsoleData(compiledata)
    }

    const executeResult = (executeResults) => {
        executedata = executeResults
        setConsoleData(executedata)
    }

    const debugResult = (debugResults) => {
        debugdata = debugResults
        setDebugData(debugdata)
    }

        return(
            <div>
                <MenuIndex latestFile={myLatestFile} Filename={myFilename} visOpen={openVis} compileResult={compileResult} executeResult={executeResult}
                           visualiseResult={debugResult} newFile={newfile} newFileName={filename} savefile={saveFile}/>
                <br/>
                <Grid container spacing={3} direction={"row"} >
                    <Grid item xs={true}>
                        {params === 'dev'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button1'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button2'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button3'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} myVars={vars} />
                            ):null}
                        {params === 'button4'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} myFormulas={formulas} />
                            ):null}
                        {params === 'button5'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button6'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button7'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button8'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                            ):null}
                        {params === 'button9'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                        ):null}
                        {params === 'button10'?(
                            <EditorIndex  uploadedFile={newfile} myFileName={filename} newValueFile={myNewFileValue} myparam={params} />
                        ):null}
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
                <ConsoleIndex displayData={consoleData} />
                </div>
            </div>
            )

    }
export default DevElement
