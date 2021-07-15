import React, {useEffect, useState} from 'react'
import {
    Paper
} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import paperImage from "../../../../assets/white-concrete-wall.jpg";
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import Typography from "@material-ui/core/Typography";

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

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
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
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapWhiteButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#f5f5f5',
        borderColor: '#f5f5f5',
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

function VisButIndex(props) {
    const classes = useStyles();

    const playD = () => {
        props.playD('play')
    }

    const prevln = () => {
        props.prevln('prev')
    }

    const nextln = () => {
        props.nextln('next')
    }

    const showV = () => {
        props.showV('show')
    }

    const stopD = () => {
        props.stopD('stop')
    }

    const closeVis = () => {
        props.visOpen('close')
    }

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
            &nbsp;&nbsp;
            <BootstrapButton color={'secondary'} className={classes.margin} >
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b>Click to navigate -></b>
                </Typography>
            </BootstrapButton>
            <BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={prevln}>
                <NavigateBeforeRoundedIcon/>
            </BootstrapWhiteButton>
            <BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={nextln}>
                <NavigateNextRoundedIcon/>
            </BootstrapWhiteButton>
            <BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={showV}>
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b>Show variable</b>
                </Typography>
            </BootstrapWhiteButton>
            <BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={stopD}>
                <StopRoundedIcon/>
            </BootstrapWhiteButton>
            <BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={closeVis}>
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b> Close Visualizer</b>
                </Typography>
            </BootstrapWhiteButton>
        </Paper>
    )
}
export default VisButIndex
