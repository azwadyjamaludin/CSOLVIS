import React, {useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ProbLayout from "./layout";
import ProbElement from "./element";
import DevProg from "../devprogram"
import Help from "../help"
import axios from "axios";

function PSIndex(){
    const URL = `${process.env.REACT_APP_REST_HOST}:${process.env.REACT_APP_REST_PORT}`;
    useEffect(() => {
            getStoredIPAddr()
            let autoSessionID = '';
            const uuidv4 = require('uuid/v4');
            autoSessionID = uuidv4()
            sessionStorage.setItem('sessionID',autoSessionID)
    },[])

    const getStoredIPAddr = () => {
        axios.get(URL+'/routes/dataMgt/getStoredIPAddress').then((res) => {
            const data = res.data
            console.log('data:',data)
            sessionStorage.setItem('IPAddress',data.ipAddress)
        })
    }

    return (
        <div>
            <BrowserRouter >
                <ProbLayout >
                    <Switch>
                        <Route exact path={'/probdes/element/:params'} render={() => <div><ProbElement storedIP={sessionStorage.getItem('IPAddress')}/></div>}/>
                    </Switch>
                </ProbLayout>
                <Route exact path={'/devprog/element/dev'} render={() => <div><DevProg storedIP={sessionStorage.getItem('IPAddress')}/></div>}/>
                <Route exact path={'/help/element/info'} component={Help}/>
            </BrowserRouter>

        </div>
    );
}
export default PSIndex
