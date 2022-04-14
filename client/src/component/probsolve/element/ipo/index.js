import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button} from "@material-ui/core";
import UIIndex from '../../ui/index.js'

function IPOIndex(props) {
    const classes = UIIndex.useStylesIPO();
console.log(props.ipos)
    return(
        <div>
        <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
            <TableContainer>
                <Typography className={classes.selectEmpty} variant={'subtitle1'}><b></b><br/></Typography>
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
            <div><br/></div>
        </Paper>
            <br/>
            <Paper variant={'elevation'} elevation={7} className={classes.paperBG2}>
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
        </div>
    )
}

export default IPOIndex
