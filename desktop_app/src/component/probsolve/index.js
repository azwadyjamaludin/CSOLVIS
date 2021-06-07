import React from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import ProbLayout from "./layout";
import ProbElement from "./element";
import DevProg from "../devprogram"
import Help from "../help"

const PSIndex = () => {
    return (
        <div>
            <Router history={history}>
                <ProbLayout>
                    <Switch>
                        <Route exact path={'/probdes/element/:params'} component={ProbElement}/>
                    </Switch>
                </ProbLayout>
                <Route exact path={'/devprog/element/dev'} component={DevProg}/>
                <Route exact path={'/help/element/info'} component={Help}/>
            </Router>

        </div>
    );
}
export default PSIndex