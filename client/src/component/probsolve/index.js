import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ProbLayout from "./layout";
import ProbElement from "./element";
import DevProg from "../devprogram"
import Help from "../help"

const PSIndex = () => {

    return (
        <div>
            <BrowserRouter >
                <ProbLayout>
                    <Switch>
                        <Route exact path={'/probdes/element/:params'} component={ProbElement}/>
                    </Switch>
                </ProbLayout>
                <Route exact path={'/devprog/element/dev'} component={DevProg}/>
                <Route exact path={'/help/element/info'} component={Help}/>
            </BrowserRouter>

        </div>
    );
}
export default PSIndex
