import React from 'react'
import {Paper, Typography} from "@material-ui/core";
import UIIndex from "../../ui/index"

function TitleIndex() {
    const classes = UIIndex.useStylesIPO();
    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <Typography variant={'body1'} paragraph={true} align={'center'}>
                Each step can be <b>REPEATED</b> or <b>IGNORED</b> if not related.
            </Typography>
        </Paper>
    )
}
export default TitleIndex
