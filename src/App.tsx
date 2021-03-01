import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import {PagePaths} from "./constants";
import Scheduler from "./views/Scheduler";
/*
const useStyles = makeStyles(() =>({
  video : {
    position: 'fixed',
    right: '0',
    bottom: '0',
    minWidth: '100%',
    minHeight: '100%',
    overflow:'none'
  },
  parent : {
    backgroundColor: props => props.customTheme,
    position: 'fixed',
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100%',
    overflowX:'hidden'
  }
}));*/


function App() {
  //const {Colors} = require('./values/colors')
  /*const classes = useStyles({
    customTheme : Colors.customTheme
  })*/

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
