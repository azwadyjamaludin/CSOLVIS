import React, {useEffect, useState} from 'react'
import MenuIndex from "./menu";
import EditorIndex from "./editor";
import VisIndex from "./visualiser";
import VisButIndex from "./visbutton";
import ConsoleIndex from "./console";
import {Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function DevElement() {
    let {params} = useParams();
    console.log(params)

    const [filename,setFileName] = useState(''); const [newfile,setNewFile] = useState(''); const [vars, setVars] = useState(''); const [formulas, setFormulas] = useState('')
    const [consoleData,setConsoleData] = useState(''); const [debugData,setDebugData] = useState('');

    let fileName = ''; const [visopen,setVisOpen] = useState(false); let compiledata = ''; let executedata = ''; let debugdata = ''; let filenamedata = ''; let argdata = ''
    let newFile = ''; const [visbutparam, setVisButParam] = useState(''); let pathD = ''; const [pData, setPData] = useState('');
    const [boolData, setBoolData] = useState(false); const [vbp,setVBP] = useState('');
    const URL = `${sessionStorage.getItem('IPAddress')}`;

    useEffect(() => {
        getVarsAndFormulas()
        getStoredFileData()
    },[])

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
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network')
            } else {
                SweetAlertSetting(error)
            }
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
                    //SweetAlertSetting('No source file found. Please create / insert a new source file and save it')
                    newFile = ''
                } else if (res.data.fileContents === 'something wrong somewhere') {
                    SweetAlertSetting('Something got wrong!!')
                } else {
                newFile = res.data.fileContents; filenamedata = res.data.fileName;
                let alteredFilename = filenamedata.replace(filenamedata.substring(0,filenamedata.indexOf('+')+1),'')
                    console.log('alteredFilename:',alteredFilename)
                setNewFile(newFile); setFileName(alteredFilename)
                }
        }).catch(function (error) {
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network')
            } else {
                SweetAlertSetting(error)
            }
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
            setVisButParam('breakpoint set --line 2\n run\n')
        }
        if (visValue === 'next') {
            console.log(visValue)
            setVBP('next')
        }
        if (visValue === 'prev') {
            console.log(visValue)
            setVBP('bt')
        }
        if (visValue === 'show') {
            console.log(visValue)
            setVBP('frame variable')
        }
        if (visValue === 'stop') {
            console.log(visValue)
            setVBP('exit')
        }
        if  (visValue === 'close') {
            setVisOpen(false)
        }
    }

    const rvbp = (rvbpData) => {
        if (rvbpData === true) {
            setVBP('')
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

    const executeResult2 = (executeResults2) => {
        executedata = executeResults2
        setConsoleData(executedata)
    }

    const debugResult = (debugResults) => {
        debugdata = debugResults
        setDebugData(debugdata)
    }

    const debugResult2 = (debugResults2) => {
        debugdata = debugResults2
        setDebugData(debugdata)
    }

    const openSTF = (bd) => {
        if (bd === true) {
            setBoolData(true)
        } else if (bd === false) {
            setBoolData(false)
        }
    }

    const pathData = (pd) => {
        pathD = pd
        console.log('pathD:',pathD)
        setPData(pathD)
    }

        return(
            <div>
                <MenuIndex latestFile={myLatestFile} Filename={myFilename} visOpen={openVis} compileResult={compileResult} executeResult={executeResult}
                           visualiseResult={debugResult} newFile={newfile} newFileName={filename} openSTF={openSTF} currentPath={pathData} />
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
                    {visopen === true && visbutparam === ''?(
                        <Grid item xs={3}>
                            <VisIndex visualiseData={debugData} debugParam={visbutparam} vbp={vbp} rvbp={rvbp} pData={pData} visResult={debugResult2}/>
                        </Grid>
                    ):null}
                </Grid>
                <br/>
                {visopen === true?(
                    <VisButIndex playD={visButParam} nextln={visButParam} prevln={visButParam} showV={visButParam} stopD={visButParam} visOpen={visButParam}/>
                ):null}
                <br/>
                <div>
                <ConsoleIndex displayData={consoleData} stfOpen={boolData} pData={pData} consResult={executeResult2}/>
                </div>
            </div>
            )

    }
export default DevElement
