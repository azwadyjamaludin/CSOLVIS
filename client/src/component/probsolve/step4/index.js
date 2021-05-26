import React, {useEffect, useState} from 'react'
import {
    InputAdornment,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


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

const Step4 = () => {
    const classes = useStyles();

  return(
        <div align={'center'}>
            <br/><br/><br/>
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    Each step can be <b>REPEATED</b> or <b>IGNORED</b> if not related.
                </Typography>
            </Paper>

            <Paper variant={'elevation'} elevation={5} className={classes.paperBG}>
                <br/>
                <Typography variant={'body2'} paragraph={true} align={'center'}>
                    Insert a formula to calculate the output
                </Typography>
                <TextField id={'step4a'}
                           label={'Output name'}
                           name={'Output'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           //value={this.state.title}
                           // onChange={this.onChangeTitle}
                           //margin={'normal'}
                           helperText="Example: luasbulatan"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                           /*InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       Gets4
                                   </InputAdornment>
                               ),
                           }}*/
                />
                <Button>=</Button>
                <TextField id={'step4b'}
                           label={'Arithmetic formula'}
                           name={'Formula'}
                           //autoFocus
                           variant={'outlined'}
                           color={'primary'}
                    //value={this.state.title}
                    // onChange={this.onChangeTitle}
                    //margin={'normal'}
                           helperText="PI * jejari * jejari"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                    /*InputProps={{
                        startAdornment: (
                            <InputAdornment position={'start'}>
                                Gets4
                            </InputAdornment>
                        ),
                    }}*/
                />
                {/*<TextField
                    id="selectStep4"
                    select
                    label="Types"
                    value={types}
                    //onChange={handleChange}
                    helperText=""
                    variant="outlined"
                    //margin={'normal'}
                    size={'small'}
                    style={{
                        backgroundColor: '#FFFAFA',
                        width: 190,
                        textAlign:'left'
                    }}
                >
                    {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>*/}
                &nbsp;&nbsp;
                <Button
                    //disabled={this.state.buttonDisable === true}
                    variant="outlined"
                    color="secondary"
                    size={'large'}
                    //onClick={this.saveDetails.bind(this)}
                >
                    Submit
                </Button>
                <div><br/></div>
            </Paper>
            <Paper variant={'elevation'} elevation={3} className={classes.paperBG}>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Input</TableCell>
                                <TableCell align="center">Process</TableCell>
                                <TableCell align="center">Output</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.paperBG2}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </div>
    )

}
export default Step4
