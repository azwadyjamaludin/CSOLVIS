import {Paper} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import {save} from "save-file";

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
        backgroundColor:"#f5f5f5"
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

function MenuIndex({latestFile,Filename}) {
    const classes = useStyles();
    const [selectedfile,setSelectedfile] = useState('');const [filename,setFilename] = useState(''); const [filepath,setFilepath] = useState('');const [latestfile,setLatestfile] = useState('')
    const URL=`http://${sessionStorage.getItem('ipsett')}`;

    const onFileChange = async (e) => {
        setSelectedfile(e.target.files[0])
        setFilename(e.target.files[0].name)
        Filename.append(filename)

        if (!e.target.files[0].name.includes('.c')) {
            fileFormat()
        }else {
        await onClickInputFile(selectedfile)
        }
    }

    const fileFormat = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...Wrong file format',
            text: 'Please choose file with .c file format!',
        }).then((r ) => {})
    }

    const onClickInputFile = async(selectedfile) => {
        const body = new FormData()
        body.append('file', selectedfile)
        console.log(body)
        if (URL != null) {
            await axios.post(URL+'/routes/fileMgt/writeFileToServer', body)
                .then((res) => {
                    setLatestfile(res.data.fileContents)
                    latestFile.append(latestfile)
                })
        }else if (URL == null) {
            nullIPSetting()
        }
    }

    const onSaveFile = async () => {
        await save(selectedfile, filename)
    }

    const compileFile = async() => {
        const body = new FormData()
        body.append('file', selectedfile)

        if (URL != null) {
            await axios.post(URL+'/routes/fileMgt/writeFileToServer',body)
                .then((res) => {
                    setFilepath(res.data.uploadPath)
                    compileCSource()
                })
        }else if (URL == null) {
            nullIPSetting()
        }
    }

    const nullIPSetting = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...Cannot communicate with server',
            text: 'You may check the IP setting!',
        }).then((r ) => {})
    }

    const compileCSource = async() => {
        const data = {cFilePath:filepath}
        await axios.post(URL+'',data).then((res) =>{

        })
    }

    const Upload =() => {
        return(
            <div>&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                    accept={'text/x-c'}
                    className={classes.input}
                    type="file"
                    onChange={onFileChange}
                    id="contained-button-file"
                />
            </div>
        )
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
        <BootstrapGreenButton color={'secondary'} className={classes.margin} onClick={onSaveFile}>
            Save .c file
        </BootstrapGreenButton>
        &nbsp;&nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin} onClick={compileFile}>
            Compile
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin}>
            Execute
        </BootstrapYellowButton>
        &nbsp;&nbsp;
        <BootstrapYellowButton color={'primary'} className={classes.margin}>
            Visualize
        </BootstrapYellowButton>
    </Paper>
        </div>
    )
}
export default MenuIndex