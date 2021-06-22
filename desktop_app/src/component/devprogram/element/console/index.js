import {Paper} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import "ace-builds/src-noconflict/theme-monokai";
import TextField from "@material-ui/core/TextField";

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

function ConsoleIndex(props) {
    const classes = useStyles();
    let displayData = '';

        if (props.displayCompile.length > 0) {
            displayData = props.displayCompile
        }
        if (props.displayExecute.length > 0) {
            displayData = props.displayExecute
        }

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <TextField id={'console'}
                       variant={'outlined'}
                       color={'primary'}
                       size={'small'}
                       onChange={displayData}
                       multiline={true}
                       rows={15}
                       fullWidth={true}
                       style={{
                           textAlign:'left'
                       }}
            />
        </Paper>
    )
}
export default ConsoleIndex
