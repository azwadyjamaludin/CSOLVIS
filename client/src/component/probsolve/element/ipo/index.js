import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import paperImage from "../../../../assets/white-concrete-wall.jpg";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
        backgroundColor:"#faf0e6"
    },
    table: {
        minWidth: 650,
    },
}));

function IPOIndex(props) {
    const classes = useStyles();
console.log(props.ipos)
    return(
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
            <TableContainer>
                <Typography className={classes.selectEmpty} variant={'subtitle1'}><b>IPO Chart</b><br/></Typography>
                <Table className={classes.table} stickyHeader={true} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Input</TableCell>
                            <TableCell align="center">Process</TableCell>
                            <TableCell align="center">Output</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.paperBG2}>
                        {props.ipos.map((row,index)=> (
                        <TableRow key={index}>
                            <TableCell align={'center'} scope={'row'}>{row.input}</TableCell>
                            <TableCell align={'center'} scope={'row'}>{row.process}</TableCell>
                            <TableCell align={'center'} scope={'row'}>{row.output}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG}>
                <Button
                    variant={'text'}
                    color={'secondary'}
                    onClick={props.resetBut}
                >
                    <Typography variant={'button'}>
                        Reset
                    </Typography>
                </Button>
                &nbsp;&nbsp;
            </Paper>
        </Paper>
    )
}

export default IPOIndex
