import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Typography from "@material-ui/core/Typography";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
}));

function ProbElement() {
    let {params} = useParams();
    const classes = useStyles();
    const myinputs=[]; const myprocesses=[]; const myoutputs=[]; const myvariables=[]; const myformulas = []

    useEffect(()=> {

    }, [])

    const myInputCallback = (inputData) => {
        myinputs.push(inputData)
    }

    const myProcessCallback = (procData) => {
        myprocesses.push(procData)
    }

    const myOutputCallback = (outData) => {
        myoutputs.push(outData)
    }

    const myVariableCallback = (varData) => {
        myvariables.push(varData)
    }

    const myFormulaCallback = (formData) => {
        myformulas.push(formData)
    }

    const onClickReset = () => {
        myinputs.length = 0
        myprocesses.length = 0
        myoutputs.length = 0
        myvariables.length = 0
        myformulas.length = 0
    }

    return(
        <div align={'center'}>
            <br/><br/><br/>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                <Typography variant={'body1'} paragraph={true} align={'center'}>
                    Each step can be <b>REPEATED</b> or <b>IGNORED</b> if not related.
                </Typography>
            </Paper>
            {params === 'step1'? (
                <Step1
                    input={myInputCallback} process={myProcessCallback} variable={myVariableCallback}
                />
            ):(null)}
            {params === 'step2'? (
                <Step2
                     process={myProcessCallback} output={myOutputCallback} variable={myVariableCallback}
                />
            ):(null)}
            {params === 'step3'? (
                <Step3
                    input={myInputCallback} process={myProcessCallback} variable={myVariableCallback}
                />
            ):(null)}
            {params === 'step4'? (
                <Step4
                    process={myProcessCallback} formula={myFormulaCallback}
                />
            ):(null)}
            {params === 'step5'? (
                <Step5 process={myProcessCallback} />
            ):(null)}
            {params === 'step6'? (
                <Step6 process={myProcessCallback} />
            ):(null)}
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                <Typography className={classes.selectEmpty} variant={'subtitle1'}><b>IPO Chart</b></Typography>
                <TableContainer>
                    <Table className={classes.table} stickyHeader={true} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Input</TableCell>
                                <TableCell align="center">Process</TableCell>
                                <TableCell align="center">Output</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.paperBG2}>
                            {myinputs.map((input,index)=>
                                <TableCell key={index}>{input}</TableCell>
                            )}
                            {myprocesses.map((process,index)=>
                                <TableCell key={index}>{process}</TableCell>
                            )}
                            {myoutputs.map((output,index)=>
                                <TableCell key={index}>{output}</TableCell>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                    <Button
                        variant={'text'}
                        color={'primary'}
                        onClick={onClickReset}
                    >
                        <Typography variant={'button'} >
                            Reset
                        </Typography>
                    </Button>
                </Paper>
            </Paper>
        </div>
    )
}
export default ProbElement