import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import DevLayout from "./layout";
import DevElement from "./element";

const DPIndex = () => {

    return (
        <div>
            <BrowserRouter >
                <DevLayout>
                    <Switch>
                        <Route exact path={'/devprog/element/:params'} render={() => <div><DevElement/></div>}/>
                    </Switch>
                </DevLayout>
            </BrowserRouter>

        </div>
    );
}
export default DPIndex