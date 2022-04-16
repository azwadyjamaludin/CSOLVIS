import {Backdrop, Paper, Button, Typography, TextField} from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import UIIndex from '../../ui/index.js';
import UIAlertIndex from "../../uiAlert/index"

function MenuIndex(props) {
    const classes = UIIndex.useStylesElements();
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [openRename, setOpenRename] = useState(false); const [currentPath, setCurrentPath] = useState('');
    let myFile = ''; let fileOriName = ''; let currentFilePath = '';

    console.log('MenuIndex-',props.newFile);

    const onFileChange =async (e) => {
        myFile = e.target.files[0]
        fileOriName = e.target.files[0].name

        if (!e.target.files[0].name.includes('.c')) {
            UIAlertIndex.SweetAlertSetting('Opps...Wrong file format,Please choose file with .c file format!')
        } else {
            await onClickInputFile(myFile)
        }
    }

    const onClickInputFile =async (uploadedFile) => {
        const body = new FormData()
        body.append('file', uploadedFile)

        await axios.post(URL + '/routes/fileMgt/writeFileToServer', body)
            .then((res) => {
                props.Filename(res.data.fileName)
                props.latestFile(res.data.fileContents)
            })
            .catch(function (error) {
                if (!error.status) {
                    UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                } else {
                    UIAlertIndex.SweetAlertSetting(error)
                }
            })
    }

    const onSaveFile = async () => {
                    let blob = new Blob([props.newFile])
                    let file = new File([blob], props.newFileName)

                    saveToServer()
        console.log('MenuIndex-onSaveFile:',file)
                    saveAs(file,props.newFileName)
    }

    const compileFile = async () => {
                let blob = new Blob([props.newFile])
                let alteredfilename = sessionStorage.getItem('sessionID')+'+'+props.newFileName
                let file = new File([blob],`${alteredfilename}`)

                const body = new FormData()
                body.append('file', file)

                    await axios.post(URL + '/routes/fileMgt/sendCurrentFile', body)
                        .then((res) => {
                            removeLogFiles()
                            props.openSTF(false)
                            currentFilePath = res.data.currentFilePath
                            props.currentPath(currentFilePath)
                            setCurrentPath(currentFilePath)
                            const body = {filePath:currentFilePath,sessionID:sessionStorage.getItem('sessionID')}
                            console.log(currentFilePath)
                            axios.post(URL+'/routes/fileMgt/compileSourceFile', body).then((res) => {
                                console.log(res.data)
                                props.compileResult('\n'+res.data)
                                const body = {filePath:currentFilePath,sessionID:sessionStorage.getItem('sessionID')}
                                axios.post(URL+'/routes/fileMgt/compileSourceForDebug', body).then((res) => {
                                }).catch(function (error) {
                                    UIAlertIndex.SweetAlertSetting(error)
                                })
                            }).catch(function (error) {
                                UIAlertIndex.SweetAlertSetting(error)
                            })
                        }).catch(function (error) {
                            if (!error.status) {
                                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                            } else {
                                UIAlertIndex.SweetAlertSetting(error)
                            }
                        })
    }

    const executeFile = async () => {
                    console.log(currentPath)
                    if (!currentPath) {
                        UIAlertIndex.SweetAlertSetting('Please compile the  C file first')
                    }else {
                    try {
                        props.openSTF(true)
                        props.xClicked(true)
                    }catch(error) {
                        if (!error.status) {
                            UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                        } else {
                            UIAlertIndex.SweetAlertSetting(error)
                            }
                        }
                    }
    }

    const saveToServer = () => {
            let sessionID = sessionStorage.getItem('sessionID')
            let blob = new Blob([props.newFile])
            let file = new File([blob], sessionID+'+'+props.newFileName)
            let storedfilepath = '';
            let storedfilename = '';

            const body = new FormData()
            body.append('file', file)
            console.log('MenuIndex-storedFile:', file)

            axios.post(URL + '/routes/fileMgt/storedFile', body)
                .then((res) => {
                    storedfilename = res.data.filename;
                    storedfilepath = res.data.filepath
                    fileOriName = storedfilename.replace(storedfilename.substring(0,storedfilename.indexOf('+')+1),'')
                    props.Filename(fileOriName)

                    const data = {
                        filepath: storedfilepath,
                        filename: storedfilename,
                        sessionID: sessionStorage.getItem('sessionID')
                    }
                    axios.post(URL + '/routes/dataMgt/storedData', data).then((res) => {

                    }).catch(function (error) {
                        UIAlertIndex.SweetAlertSetting(error)
                    })
                })
                .catch(function (error) {
                    if (!error.status) {
                        UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                    } else {
                        UIAlertIndex.SweetAlertSetting(error)
                    }
                })
        }

    const Upload = () => {
        return (
            <div>&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                    className={classes.input}
                    type="file"
                    onChange={onFileChange}
                    id="contained-button-file"
                />
            </div>
        )
    }

    const visualiseFile = async () => {
                    console.log(currentPath)
                if (!currentPath) {
                    UIAlertIndex.SweetAlertSetting('Please compile the  C file first')
                }else {
                try {
                    props.visOpen('open')
                    props.openSTF(false)
                    props.dClicked(true)
                }catch (error) {
                    if (!error.status) {
                        UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                    } else {
                        UIAlertIndex.SweetAlertSetting(error)
                        }
                    }
                }
    }

    const openRenameFile = () => {
        setOpenRename(true)
    }

    const onChangeRenameFile = (e) => {
        fileOriName = e.target.value
        props.Filename(fileOriName+'.c')
    }

    const closeRenameFile = () => {
        setOpenRename(false)
    }

    const removeLogFiles = () => {
        const body = {sesID:sessionStorage.getItem('sessionID')}
        try {
        axios.post(URL + '/routes/fileMgt/removeLogFiles', body).then((res) => {
        }).catch(function (error) {
                UIAlertIndex.SweetAlertSetting(error)
        })
        }catch (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        }
    }

    return(
        <div>
        <Upload/>
    <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="contained-button-file">
            <UIIndex.BootstrapGreenButton color={'secondary'} className={classes.margin} component={'span'}>
                Open .c file
            </UIIndex.BootstrapGreenButton>
        </label>
        &nbsp;&nbsp;
        <UIIndex.BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={openRenameFile}>
            Rename .c file
        </UIIndex.BootstrapGreenButton>
        <Backdrop className={classes.backdrop} open={openRename} >
            <Paper variant={'elevation'}>
                <Typography align={'center'}>
                    Rename .c file
                </Typography>
                &nbsp;&nbsp;
                    <TextField id={'rename'} placeholder={'Rename .c file'} name={'rename'} variant={'outlined'} color={'primary'} onChange={onChangeRenameFile}
                               size={'small'}
                               autoFocus={true}
                               style={{
                                   backgroundColor: '#FFFAFA',
                                   width: 500,
                                   textAlign:'left'
                               }}

                    />
                &nbsp;&nbsp;
                    <Button
                        variant="outlined"
                        color="secondary"
                        type={'submit'}
                        onClick={closeRenameFile}
                    >
                        close
                    </Button>
                &nbsp;&nbsp;
                <div><br/></div>
            </Paper>
        </Backdrop>
        &nbsp;&nbsp;
        <UIIndex.BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={onSaveFile}>
            Save .c file
        </UIIndex.BootstrapGreenButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <UIIndex.BootstrapYellowButton color={'primary'} className={classes.margin} onClick={compileFile}>
            Compile
        </UIIndex.BootstrapYellowButton>
        &nbsp;&nbsp;
        <UIIndex.BootstrapYellowButton color={'primary'} className={classes.margin} onClick={executeFile}>
            Execute
        </UIIndex.BootstrapYellowButton>
        &nbsp;&nbsp;
        <UIIndex.BootstrapYellowButton color={'primary'} className={classes.margin} onClick={visualiseFile} disabled={true}>
            Visualize
        </UIIndex.BootstrapYellowButton>
    </Paper>
        </div>
    )
}
export default MenuIndex
