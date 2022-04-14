import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import CSOLVISImage from '../../../../assets/CSOLVIS.png'
import UIIndex from "../../ui/index"

const IFIndex = () => {
    const classes = UIIndex.useStyles();

    return(
        <div><br/>
            <Paper className={classes.paperBG2} variant={'elevation'} elevation={7} >
                <br/>
                <Typography variant={'h1'} paragraph={true} align={'center'}>
                    <img src={CSOLVISImage} />
                    <Typography variant={'body2'} paragraph={true} align={'center'}>
                        C-SOLVIS is a pedagogical IDE for the teaching and learning of C programming fundamentals that covers:<br/>
                        <b>Basic input/output function</b><br/>
                        <b>Basic data types</b><br/>
                        <b>Basic header files</b><br/>
                        <b>Basic C instructions</b><br/>
                        <b>C Operators</b><br/><br/>
                        <Typography variant={'caption'} paragraph={true} align={'center'}>
                            By <b>NOR FARAHWAHIDA BINTI MOHD NOR</b>
                        </Typography><br/>
                    </Typography>
                </Typography>
            </Paper>
        </div>
    )
}
export default IFIndex
