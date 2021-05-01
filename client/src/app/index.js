//import logo from './logo-and-wordmark.png';
//import '../style/App.scss';
import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Layout from './layout'
import Home from "./component"

function App() {
  useEffect(() => {
  },[])

  return (
      <div>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path={'/'} render={() => <div><Home /></div>}/>
        </Switch>
     </Router>
    </div>
  );
}

export default App;
