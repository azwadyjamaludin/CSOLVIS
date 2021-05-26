import React, {useEffect} from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from '../../config/history';
import Layout from "./layout";
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Step4 from "./step4"
import Step5 from "./step5"
import Step6 from "./step6"
import DevProg from "../devprogram"
import Help from "../help"

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
                        <Route exact path={'/probdes/step1'} render={()=> <div><Step1 /></div>}/>
                        <Route exact path={'/probdes/step2'} render={()=> <div><Step2 /></div>}/>
                        <Route exact path={'/probdes/step3'} render={()=> <div><Step3 /></div>}/>
                        <Route exact path={'/probdes/step4'} render={()=> <div><Step4 /></div>}/>
                        <Route exact path={'/probdes/step5'} render={()=> <div><Step5 /></div>}/>
                        <Route exact path={'/probdes/step6'} render={()=> <div><Step6 /></div>}/>
                    </Switch>
                </Layout>
                <Switch>
                <Route exact path={'/devprog/editor'} render={()=> <div><DevProg/></div>}/>
                <Route exact path={'/help/info'} render={()=> <div><Help/></div>}/>
                </Switch>
            </Router>

        </div>
    );
}
export default PSIndex