import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import {PagePaths} from "./constants";
import Scheduler from "./views/Scheduler";

function App() {
  return (
    <BrowserRouter>
      {/*className={classes.parent}*/}
      <div className="App">
        <Route exact path={`/${PagePaths.LOGIN}`}>
          <Login />
        </Route>
        <Route exact path={`/${PagePaths.MAIN}`} >
          <Dashboard page={PagePaths.MAIN}/>
        </Route>
        <Route exact path="/scheduler" >
          <Scheduler />
        </Route>
        {/*<Route exact path="/setting" >
          <Setting page={"setting"} />
        </Route>*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
