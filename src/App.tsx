import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import {PagePaths} from "./reference/constants";
import Scheduler from "./views/Scheduler";
import axios from "axios";
import {getReduxData} from "@funcUtils/getReduxData";

function App() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${getReduxData('authentication')['accessToken'] || ""}`;

  return (
    <BrowserRouter>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
