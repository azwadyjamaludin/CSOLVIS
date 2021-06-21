import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import MenuIndex from "./menu";
import EditorIndex0 from "./editor0";
import EditorIndex1 from "./editor1";
import EditorIndex2 from "./editor2";
import EditorIndex3 from "./editor3";
import EditorIndex4 from "./editor4";
import EditorIndex5 from "./editor5";
import VisIndex from "./visualiser";
import ConsoleIndex from "./console";
import {makeStyles} from "@material-ui/core/styles";
import paperImage from "../../../assets/white-concrete-wall.jpg";
import {Grid} from "@material-ui/core";

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

function DevElement() {
    const classes = useStyles();
    let {params} = useParams();
    let latestFile='';let fileName='';
    let stdioButton = "'#include' '<'stdio.h'>'"; let mainButton = "int main() {" +"\\n"+"\\n"+"return 0"+"\\n"+"}";
    let vardata = (sessionStorage.getItem('variables'));let formuladata = (sessionStorage.getItem('formulas'))

    const myLatestFileCallback = (latestFileData) => {
	    if (latestFileData !== null) {
        latestFile.append(latestFileData)
	    }
    }
	 const myLatestFileCallback2 = (latestFileData2) => {
	    if (latestFileData2 !== null) {
        latestFile.append(latestFileData2)
	    }
    }


    const myFilenameCallback = (filenameData) => {
	    if (filenameData !== null) {
        fileName.append(filenameData)
	    }
    }
    console.log(params)
    return(
        <div>
            <MenuIndex latestFile={myLatestFileCallback} Filename={myFilenameCallback}/>
            <Grid container spacing={2} row={true} >
                <Grid item xs={9} >
                {params === 'dev' ?(
                <EditorIndex0 uploadedFile={latestFile} filename={fileName} newValueFile={myLatestFileCallback2} />
                ):(null)}
                {params === 'button1' ?(
                <EditorIndex1  uploadedFile={latestFile} filename={fileName} snippet={stdioButton} newValueFile={myLatestFileCallback2}/>
                ):(null)}
                {params === 'button2' ?(
                <EditorIndex2  uploadedFile={latestFile} filename={fileName} snippet={mainButton} newValueFile={myLatestFileCallback2}/>
                ):(null)}
                {params === 'button3' ?(
                <EditorIndex3  uploadedFile={latestFile} filename={fileName} myvar={vardata} newValueFile={myLatestFileCallback2}/>
                ):(null)}
                {params === 'button4' ?(
                <EditorIndex4  uploadedFile={latestFile} filename={fileName} myformula={formuladata} newValueFile={myLatestFileCallback2}/>
                ):(null)}
                </Grid>
                <Grid item xs={3} >
                <VisIndex/>
                </Grid>
            </Grid>
            <ConsoleIndex/>
        </div>
    )
}
export default DevElement
