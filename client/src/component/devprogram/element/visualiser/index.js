import React, {useEffect, useRef, useState} from 'react'
import {
    Paper
} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import paperImage from '../../../../assets/white-concrete-wall.jpg'
import TextField from "@material-ui/core/TextField";
import insertTextAtCursor from 'insert-text-at-cursor';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundImage: 'url('+paperImage+')',

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

function VisIndex(props) {
    const classes = useStyles(); const tfRef = useRef(); const curPos = 0
    let debugData = ''

     const visButParams = () => {
            const el = tfRef.current
            insertTextAtCursor(el,props.debugParam)
     }

    return(
        <div>
            <Paper variant={'elevation'} elevation={0} className={classes.paperBG} >
                <TextField id={'vis'}
                           variant={'outlined'}
                           color={'primary'}
                           size={'small'}
                           onChange={props.visualiseData}
                           ref={tfRef}
                           onBlur={visButParams}
                           multiline={true}
                           rows={30}
                           fullWidth={true}
                           style={{
                               textAlign:'left'
                           }}
                />
            </Paper>
        </div>
    )
}
export default VisIndex
