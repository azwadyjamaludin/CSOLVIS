import {Backdrop, Paper} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { saveAs } from "file-saver";

const BootstrapGreenButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5, backgroundColor: '#90ee90', borderColor: '#90ee90',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#f5f5f5', borderColor: '#f5f5f5', boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#0062cc', borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapYellowButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5, backgroundColor: '#ffff00', borderColor: '#ffff00',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#f5f5f5',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#0062cc', borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundImage: 'url('+paperImage+')'
    },
    paperBG2: {
        backgroundColor:"#bcd4e6"
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

function MenuIndex(props) {
    const classes = useStyles();
    const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [openRename, setOpenRename] = useState(false); const [currentPath, setCurrentPath] = useState('');
    let myFile = ''; let fileOriName = ''; let currentFilePath = '';

    console.log('MenuIndex-',props.newFile);

    const onFileChange =async (e) => {
        myFile = e.target.files[0]
        fileOriName = e.target.files[0].name

        if (!e.target.files[0].name.includes('.c')) {
            SweetAlertSetting('Opps...Wrong file format,Please choose file with .c file format!')
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
                    SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                } else {
                    SweetAlertSetting(error)
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
                                    SweetAlertSetting(error)
                                })
                            }).catch(function (error) {
                                SweetAlertSetting(error)
                            })
                        }).catch(function (error) {
                            if (!error.status) {
                                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                            } else {
                                SweetAlertSetting(error)
                            }
                        })
    }

    const executeFile = async () => {
                    console.log(currentPath)
                    if (!currentPath) {
                        SweetAlertSetting('Please compile the  C file first')
                    }else {
                    try {
                        props.openSTF(true)
                        props.xClicked(true)
                    }catch(error) {
                        if (!error.status) {
                            SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                        } else {
                            SweetAlertSetting(error)
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
                        SweetAlertSetting(error)
                    })
                })
                .catch(function (error) {
                    if (!error.status) {
                        SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                    } else {
                        SweetAlertSetting(error)
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
                    SweetAlertSetting('Please compile the  C file first')
                }else {
                try {
                    props.visOpen('open')
                    props.openSTF(false)
                    props.dClicked(true)
                }catch (error) {
                    if (!error.status) {
                        SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
                    } else {
                        SweetAlertSetting(error)
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
                SweetAlertSetting(error)
        })
        }catch (error) {
            if (!error.status) {
                SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                SweetAlertSetting(error)
            }
        }
    }

    const SweetAlertSetting = (error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
        })
    }

    return(
        <div>
        <Upload/>
    <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="contained-button-file">
            <BootstrapGreenButton color={'secondary'} className={classes.margin} component={'span'}>
                Open .c file
            </BootstrapGreenButton>
        </label>
        &nbsp;&nbsp;
        <BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={openRenameFile}>
            Rename .c file
        </BootstrapGreenButton>
        <Backdrop className={classes.backdrop} open={openRename} >
            <Paper variant={'elevation'}>
                <Typography align={'center'}>
                    Rename .c file
                </Typography>
                &nbsp;&nbsp;
                    <TextField id={'rename'}
                               placeholder={'Rename .c file'}
                               name={'rename'}
                               variant={'outlined'}
                               color={'primary'}
                               onChange={onChangeRenameFile}
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
        <BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={onSaveFile}>
            Save .c file
        </BootstrapGreenButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={compileFile}>
            Compile
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={executeFile}>
            Execute
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={visualiseFile} disabled={false}>
            Visualize
        </BootstrapYellowButton>
    </Paper>
        </div>
    )
}
export default MenuIndex
