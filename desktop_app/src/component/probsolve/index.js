import React, {useEffect} from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import Layout from "./layout";
import ProbDes from "./sub"
import DevProg from "../devprogram"

const PSIndex = () => {
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
                        <Route exact path={'/probdes1'} render={()=> <div><ProbDes st1={true} st2={false}/></div>}/>
                        <Route exact path={'/probdes2'} render={()=> <div><ProbDes st1={false} st2={true}/></div>}/>
                    </Switch>
                </Layout>
                <Route exact path={'/devprog'} render={()=> <div><DevProg/></div>}/>
            </Router>

        </div>
    );
}
export default PSIndex