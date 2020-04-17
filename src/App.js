import React from 'react';
import './App.css';
import {PpdbOut, Login, RegistrantTable, RegistrantCard} from "./components"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/Js/Header/Header"

function App() {
  const isLogin = localStorage.getItem("token");
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
          <Route path="/regist-table" exact={true}>
            {isLogin ? <RegistrantTable /> : <Redirect to="/login" />}            
          </Route>
          <Route path="/regist-card/:id" exact={true}>
            <RegistrantCard />    
          </Route>
        </Route>        
      </Switch>
    </Router> 
  );
}

export default App;
