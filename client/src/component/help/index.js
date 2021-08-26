import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HelpLayout from "./layout";
import HelpElement from "./element";

const HPIndex = (props) => {

    return (
        <div>
            <BrowserRouter>
                <HelpLayout>
                    <Switch>
                        <Route exact path={'/help/element/:params'} component={HelpElement}/>
                    </Switch>
                </HelpLayout>
            </BrowserRouter>

        </div>
    );
}
export default HPIndex
