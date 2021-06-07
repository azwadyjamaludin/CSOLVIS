import React from 'react'
import { useParams } from "react-router-dom";
import MenuIndex from "./menu";
import EditorIndex from "./editor";
import ConsoleIndex from "./console";

function DevElement() {
    let {params} = useParams();
    let latestFile='';let fileName='';
    let stdioButton = "'#include' '<'stdio.h'>'"; let mainbut = "int main() {" +"\\n"+"\\n"+"return 0"+"\\n"+"}";
    //let vardata = [JSON.parse(sessionStorage.getItem('variables'))];let formuladata = [JSON.parse(sessionStorage.getItem('formulas'))]

    const myLatestFileCallback = (latestFileData) => {
        latestFile.append(latestFileData)
    }

    const myFilenameCallback = (filenameData) => {
        fileName.append(filenameData)
    }

    return(
        <div>
            <MenuIndex latestFile={myLatestFileCallback} Filename={myFilenameCallback}/>
            <br/>
            {params === 'dev' ?(
                <EditorIndex uploadedFile={latestFile} filename={fileName} pat={''}/>
            ):(null)}
            {params === 'button1' ?(
                <EditorIndex  uploadedFile={latestFile} filename={fileName} pat={stdioButton}/>
            ):(null)}
            {params === 'button2' ?(
                <EditorIndex  uploadedFile={latestFile} filename={fileName} pat={'main'}/>
            ):(null)}
            {params === 'button3' ?(
                <EditorIndex  uploadedFile={latestFile} filename={fileName} pat={stdioButton} pat={'vars'}/>
            ):(null)}
            {params === 'button4' ?(
                <EditorIndex  uploadedFile={latestFile} filename={fileName} pat={stdioButton} pat={'fors'}/>
            ):(null)}
            <br/>
            <ConsoleIndex/>
        </div>
    )
}
export default DevElement