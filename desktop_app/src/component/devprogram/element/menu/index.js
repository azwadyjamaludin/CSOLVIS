import {Backdrop, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
    const URL = `http://${sessionStorage.getItem('ipsett')}`; const [openRename, setOpenRename] = useState(false)

    let myFile = ''; let fileOriName = ''

    async function onFileChange(e)  {
        myFile = e.target.files[0]
        fileOriName = e.target.files[0].name
        console.log('MenuIndex-filename:',fileOriName,'MenuIndex-uploadfile:',myFile)

        if (!e.target.files[0].name.includes('.c')) {
            fileFormat()
        } else {
            await onClickInputFile(myFile)
        }
    }

    function fileFormat() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...Wrong file format',
            text: 'Please choose file with .c file format!',
        }).then((r) => {
        })
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
                    errorIPSetting(error)
                })
    }

    const onSaveFile = async () => {
                    let blob = new Blob([props.newFile])
                    let file = new File([blob], fileOriName)

                    const body = new FormData()
                    body.append('file', file)

                    await axios.post(URL+'routes/fileMgt/downloadSourceFile', body).then((res) => {

                    }).catch(function (error) {
                        errorIPSetting(error)
                    })
    }

    const compileFile = async () => {
                let blob = new Blob([props.newFile])
                let file = new File([blob], fileOriName)

                const body = new FormData()
                body.append('file', file)

                    await axios.post(URL + '/routes/fileMgt/compileSourceFile', body)
                        .then((res) => {
                            props.compileResult(res.data.compileResult)
                        }).catch(function (error) {
                            errorIPSetting(error)
                        })
    }

    const executeFile = async () => {
                let blob = new Blob([props.newFile])
                let file = new File([blob], fileOriName)

                const body = new FormData()
                body.append('file', file)

                    await axios.post(URL + '/routes/fileMgt/executeSourceFile', body)
                        .then((res) => {
                            props.executeResult(res.data.executeResult)
                        }).catch(function (error) {
                            errorIPSetting(error)
                        })
    }

    const errorIPSetting = (error) => {
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
                    let blob = new Blob([props.newFile])
                    let file = new File([blob], fileOriName)

                    props.visOpen('open')
                    const body = new FormData()
                    body.append('file', file)

                    await axios.post(URL + '/routes/fileMgt/debugSourceFile', body)
                    .then((res) => {
                        props.visualiseResult(res.data.debugResult)
                     })
                    .catch(function (error) {
                       errorIPSetting(error)
                    })
    }

    const openRenameFile = () => {
        setOpenRename(true)

    }

    const onChangeRenameFile = (e) => {
        fileOriName = e.target.value
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
                <Typography >
                    Rename .c file
                </Typography>
                    <TextField id={'rename'}
                               placeholder={'Rename .c file'}
                               name={'rename'}
                               variant={'outlined'}
                               color={'primary'}
                               onChange={onChangeRenameFile}
                               size={'small'}
                               style={{
                                   backgroundColor: '#FFFAFA',
                                   width: 500,
                                   textAlign:'left'
                               }}

                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        type={'submit'}
                        onClick={closeRenameFile}
                    >
                        close
                    </Button>
            </Paper>
            <br/>
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
