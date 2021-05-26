import React, {useEffect} from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import Layout from "./layout";
import ProbDes from "../probsolve/step1"
import DevEditor from "./editor"
import Help from "../help"


const DPIndex = () => {
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
                        <Route exact path={'/devprog/editor'} render={()=> <div><DevEditor/></div>}/>
                    </Switch>
                </Layout>
                <Switch>
                <Route exact path={'/probdes/step1'} render={()=> <div><ProbDes/></div>}/>
                <Route exact path={'/help/info'} render={()=> <div><Help/></div>}/>
                </Switch>
            </Router>

        </div>
    );
}
export default DPIndex