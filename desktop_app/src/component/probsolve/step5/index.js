import React, {useEffect, useState} from 'react'
import {
    InputAdornment,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, withStyles
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

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        //border: '1px solid',
        lineHeight: 1.5,
        //backgroundColor: '#0063cc',
        //borderColor: '#0063cc',
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
            //backgroundColor: '#0069d9',
            //borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            //backgroundColor: '#0062cc',
            //borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const Step5 = () => {
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
                    <u>CONDITIONAL ACTION</u>
                </Typography>
                <TextField id={'step5a'}
                           label={'Selection condition'}
                           name={'Condition'}
                           autoFocus
                           variant={'outlined'}
                           color={'primary'}
                           //value={this.state.title}
                           // onChange={this.onChangeTitle}
                           //margin={'normal'}
                           helperText="Example: jejari < 0"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       If
                                   </InputAdornment>
                               ),
                           }}
                />
                <br/><br/>
                <BootstrapButton >
                    If the condition is met
                </BootstrapButton>
                &nbsp;
                <TextField id={'step5b'}
                           label={'if-true action/formula'}
                           name={'Action'}
                           //autoFocus
                           variant={'outlined'}
                           color={'primary'}
                    //value={this.state.title}
                    // onChange={this.onChangeTitle}
                    //margin={'normal'}
                           helperText="Example: luasbulatan = 0"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       do
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;&nbsp;
                {/*<TextField
                    id="selectStep5"
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
                <TextField id={'step5c'}
                           label={'if-false action/formula'}
                           name={'Action'}
                    //autoFocus
                           variant={'outlined'}
                           color={'primary'}
                    //value={this.state.title}
                    // onChange={this.onChangeTitle}
                    //margin={'normal'}
                           helperText="Example: proceed"
                           size={'small'}
                           style={{
                               backgroundColor: '#FFFAFA',
                               width: 400,
                               textAlign:'left'
                           }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position={'start'}>
                                       else
                                   </InputAdornment>
                               ),
                           }}
                />
                &nbsp;
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
export default Step5
