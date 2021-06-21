import {Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import paperImage from '../../../../assets/white-concrete-wall.jpg'

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
    let uploadfile = ''; let filename = ''; let saveFile = ''
    const URL = `http://${sessionStorage.getItem('ipsett')}`;

    async function onFileChange(e)  {
        uploadfile = e.target.files[0]
        filename = e.target.files[0].name
        saveFile = uploadfile
        console.log('MenuIndex-filename:',filename,'MenuIndex-uploadfile:',uploadfile)

        if (!e.target.files[0].name.includes('.c')) {
            fileFormat()
        } else {
            await onClickInputFile(uploadfile)
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
                    props.Filename(filename)
                    props.latestFile(res.data.fileContents)
                })
                .catch(function (error) {
                    errorIPSetting(error)
                })
    }

    const onSaveFile = async () => {
                let newsavefile = props.newFile
                if (newsavefile !== '') {
                    const body = new FormData()
                    body.append('file', saveFile)

                    await axios.post(URL+'routes/fileMgt/downloadSourceFile', body).then((res) => {

                    }).catch(function (error) {
                        errorIPSetting(error)
                    })
                }
                const body = new FormData()
                body.append('file', newsavefile)

                await axios.post(URL+'routes/fileMgt/downloadSourceFile', body).then((res) => {

                }).catch(function (error) {
                    errorIPSetting(error)
                })
    }

    const compileFile = async () => {
        let blob = new Blob([props.newFile])
        let file = new File([blob], filename)

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
        let file = new File([blob], filename)

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
            let file = new File([blob], filename)
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
