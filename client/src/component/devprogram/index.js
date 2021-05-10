import React, {useEffect} from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import Layout from "./layout";
import ProbDes from "../probsolve/sub"


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
                        {/*<Route exact path={'/devprog'} render={()=> <div><DevProg/></div>}/>*/}
                    </Switch>
                </Layout>
                <Route exact path={'/probdes1'} render={()=> <div><ProbDes/></div>}/>
            </Router>

        </div>
    );
}
export default DPIndex