import React from 'react';
import './App.css';
import {PpdbOut, Login} from "./components"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/Js/Header/Header"

function App() {
  return (   
    <Router>
      <Header />
      <Switch>
        <Route>
          <Route path="/" exact={true}>
            <PpdbOut />    
          </Route>
          <Route path="/login" exact={true}>
            <Login />    
          </Route>
        </Route>        
      </Switch>
    </Router> 
  );
}

export default App;
