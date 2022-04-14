import React, {useState} from 'react'
import {Paper,Typography,TextField} from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import UIIndex from "../../ui/index";

function VisButIndex(props) {
    const classes = UIIndex.useStylesElements(); const [kid, setKid] = useState(''); const [hideButton, setHideButton] = useState(true)

    const playD = async() => {
        props.playD('play')
        setHideButton(false)
    }

    const prevLn = async() => {
        props.prevln('prev')
    }

    const nextLn = async() => {
        props.nextln('next')
    }

    const keyIn = async (e) => {
        if (e.key === 'Enter') {
            props.keyIn(kid)
            setKid('')
        }
    }

    const showV = async() => {
        props.showV('show')
    }

    const stopD = async() => {
        props.stopD('stop')
    }

    const closeVis = async() => {
        props.visOpen('close')
    }

    const onTextChange = async(e) => {
        setKid(e.target.value)
    }

    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            &nbsp;&nbsp;
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={playD}>
                <PlayArrowRoundedIcon/>
            </UIIndex.BootstrapWhiteButton>
            <UIIndex.BootstrapButton color={'secondary'} className={classes.margin} disabled={hideButton} >
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b>Click to navigate -></b>
                </Typography>
            </UIIndex.BootstrapButton>
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={prevLn} disabled={hideButton}>
                <NavigateBeforeRoundedIcon/>
            </UIIndex.BootstrapWhiteButton>
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={nextLn} disabled={hideButton}>
                <NavigateNextRoundedIcon/>
            </UIIndex.BootstrapWhiteButton>
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={showV} disabled={hideButton}>
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b>Show variables</b>
                </Typography>
            </UIIndex.BootstrapWhiteButton>
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={stopD} disabled={hideButton}>
                <StopRoundedIcon/>
            </UIIndex.BootstrapWhiteButton>
            <TextField id={'keyIn'}
                       placeholder={'Key in and press enter'}
                       className={classes.margin2}
                       variant={'outlined'}
                       color={'secondary'}
                       value={kid}
                       onChange={onTextChange}
                       onKeyPress={keyIn}
                       size={'small'}
                       style={{
                           backgroundColor: '#f5f5f5',
                           width: 200,
                           textAlign:'left'
                       }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <UIIndex.BootstrapWhiteButton color={'secondary'} className={classes.margin} onClick={closeVis}>
                <Typography variant={'body2'} className={classes.margin} paragraph={false} >
                    <b> Close Visualizer</b>
                </Typography>
            </UIIndex.BootstrapWhiteButton>
        </Paper>
    )
}
export default VisButIndex
