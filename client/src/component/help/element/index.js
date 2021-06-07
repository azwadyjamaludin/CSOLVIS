import React from 'react'
import { useParams } from "react-router-dom";
import IFIndex from "./info";
import STIndex from "./setting";

function HelpElement() {
    let {params} = useParams();
    return (
        <div>
            {params === 'info' ? (
                <IFIndex/>
            ):(null)}
            {params === 'setting' ? (
                <STIndex/>
            ):(null)}
        </div>
    )

}
export default HelpElement