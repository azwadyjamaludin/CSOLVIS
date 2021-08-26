import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import paperImage from "../../../../assets/white-concrete-wall.jpg";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";

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
}));

function TitleIndex() {
    const classes = useStyles();
    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <Typography variant={'body1'} paragraph={true} align={'center'}>
                Each step can be <b>REPEATED</b> or <b>IGNORED</b> if not related.
            </Typography>
        </Paper>
    )
}
export default TitleIndex
