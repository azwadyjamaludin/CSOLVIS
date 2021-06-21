import TextField from "@material-ui/core/TextField";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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

function ConsoleIndex() {
    const classes = useStyles();

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <TextField id={'console'}
               variant={'outlined'}
               color={'primary'}
               size={'small'}
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