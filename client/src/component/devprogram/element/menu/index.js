import {Backdrop, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { saveAs } from "file-saver";

const BootstrapGreenButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#90ee90',
        borderColor: '#90ee90',
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
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapYellowButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffff00',
        borderColor: '#ffff00',
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
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
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

function MenuIndex(props) {
    const classes = useStyles();
    const URL = `http://${sessionStorage.getItem('ipsett')}`; const [openRename, setOpenRename] = useState(false); const [currentPath, setCurrentPath] = useState('')

    let myFile = ''; let fileOriName = ''; let currentFilePath = '';
    console.log('MenuIndex-',props.newFile)

    useEffect(() => {
        if (!URL) {
            SweetAlertSetting('Please check your network / IP setting')
        }
    },[])

    async function onFileChange(e)  {
        myFile = e.target.files[0]
        fileOriName = e.target.files[0].name
        console.log('MenuIndex-filename:',fileOriName,'MenuIndex-uploadfile:',myFile)

        if (!e.target.files[0].name.includes('.c')) {
            SweetAlertSetting('Opps...Wrong file format,Please choose file with .c file format!')
        } else {
            await onClickInputFile(myFile)
        }
    }

    async function onClickInputFile(uploadedFile) {
        const body = new FormData()
        body.append('file', uploadedFile)

            await axios.post(URL + '/routes/fileMgt/writeFileToServer', body)
                .then((res) => {
                    props.Filename(fileOriName)
                    props.latestFile(res.data.fileContents)
                })
                .catch(function (error) {
                    SweetAlertSetting(error)
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
                let sessionID = sessionStorage.getItem('sessionID')
                let blob = new Blob([props.newFile])
                let file = new File([blob],`${props.newFileName}`)

                const body = new FormData()
                body.append('file', file)

                    await axios.post(URL + '/routes/fileMgt/sendCurrentFile', body)
                        .then((res) => {
                            currentFilePath = res.data.currentFilePath
                            setCurrentPath(currentFilePath)
                            const body = {filePath:currentFilePath}
                            console.log(currentFilePath)
                            axios.post(URL+'/routes/fileMgt/compileSourceFile', body).then((res) => {
                                console.log(res.data.compileData)
                                props.compileResult('\n'+res.data.compileData)
                            }).catch(function (error) {
                                SweetAlertSetting(error)
                            })
                        }).catch(function (error) {
                            SweetAlertSetting(error)
                        })
    }

    const executeFile = async () => {
                    const body = {filePath:currentPath}
                    console.log(currentPath)
                    if (!currentPath) {
                        SweetAlertSetting('Please compile the  C file first')
                    }else {

                    await axios.post(URL + '/routes/fileMgt/executeSourceFile', body)
                        .then((res) => {
                            props.executeResult('\n'+res.data.executeData)
                        }).catch(function (error) {
                            SweetAlertSetting(error)
                        })
                    }
    }


    const saveToServer = () => {
            let sessionID = sessionStorage.getItem('sessionID')
            let blob = new Blob([props.newFile])
            let file = new File([blob], sessionID+'-'+props.newFileName)
            let storedfilepath = '';
            let storedfilename = '';

            const body = new FormData()
            body.append('file', file)
            console.log('MenuIndex-storedFile:', file)

            axios.post(URL + '/routes/fileMgt/storedFile', body)
                .then((res) => {
                    storedfilename = res.data.filename;
                    storedfilepath = res.data.filepath
                    fileOriName = storedfilename
                    props.Filename(fileOriName)
                    console.log('storedfilename:', storedfilename, 'storedfilepath:', storedfilepath)
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
                    SweetAlertSetting(error)
                })
        }


    const SweetAlertSetting = (error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
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
                    props.visOpen('open')
                    const body = {filePath:currentPath}
                    console.log(currentPath)
                if (!currentPath) {
                    SweetAlertSetting('Please compile the  C file first')
                }else {
                    await axios.post(URL + '/routes/fileMgt/debugSourceFile', body)
                        .then((res) => {
                            props.visualiseResult('\n'+res.data.debugData)
                        })
                        .catch(function (error) {
                            SweetAlertSetting(error)
                        })
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

    return(
        <div>
        <Upload/>
    <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="contained-button-file">
            <BootstrapGreenButton color={'secondary'} className={classes.margin} component={'span'}>
                Open .c file
            </BootstrapGreenButton>
        </label>
        &nbsp;&nbsp;
        <BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={onSaveFile}>
            Save .c file
        </BootstrapGreenButton>
        &nbsp;&nbsp;&nbsp;
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
        &nbsp;&nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={compileFile}>
            Compile
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={executeFile}>
            Execute
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={visualiseFile}>
            Visualize
        </BootstrapYellowButton>
    </Paper>
        </div>
    )
}
export default MenuIndex
