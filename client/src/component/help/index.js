import React, {useEffect} from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import Layout from "./layout";
import Info from './info'
import DevProg from "../devprogram/editor"
import ProbDev from "../probsolve/step1"

const HPIndex = () => {
    useEffect(() => {
        /*if (refresh === true) {
            window.location.reload(false)
        }*/
    },[])

    return (
        <div>
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route exact path={'/help/info'} render={()=> <div><Info/></div>}/>
                    </Switch>
                </Layout>
                <Route exact path={'/probdev/step1'} render={()=> <div><ProbDev/></div>}/>
                <Route exact path={'/devprog/editor'} render={()=> <div><DevProg/></div>}/>
            </Router>

        </div>
    );
}
export default HPIndex