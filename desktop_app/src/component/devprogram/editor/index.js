import React from 'react'
import {
    Paper,
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-xcode";


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
}));

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

const TEIndex = () => {
    const classes = useStyles();

    return(
        <div>
            &nbsp;&nbsp;
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                &nbsp;&nbsp;&nbsp;
                <BootstrapGreenButton color={'secondary'} className={classes.margin}>
                    Open
                </BootstrapGreenButton>
                &nbsp;&nbsp;
                <BootstrapGreenButton color={'secondary'} className={classes.margin}>
                    Save
                </BootstrapGreenButton>
                &nbsp;&nbsp;&nbsp;
                <BootstrapYellowButton color={'primary'} className={classes.margin}>
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
                <br/>
            </Paper>
            <br/>
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    <br/>
                    Code Editor
                </Typography>
                <AceEditor

                    //value={this.state.editorState}
                    theme="xcode"
                    mode="javascript"
                    width="auto"
                    //onChange={this.onChange}
                    showGutter={true}
                    editorProps={{
                        $blockScrolling: true,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                />
            </Paper>
            <br/>
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG2}>
                <TextField id={'console'}
                           //name={''}
                           //autoFocus
                           variant={'outlined'}
                           color={'primary'}
                    //value={this.state.title}
                    // onChange={this.onChangeTitle}
                    //margin={'normal'}
                           //helperText="Example: jejari"
                           size={'small'}
                           multiline={true}
                           rows={10}
                           fullWidth={true}
                           style={{
                               textAlign:'left'
                           }}
                />
            </Paper>
        </div>
    )
}
export default TEIndex