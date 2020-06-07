import React from 'react';
import './App.css';
import {
  PpdbOut, 
  Login, 
  RegistrantTable, 
  RegistrantCard, 
  AddAdmin, 
  RegsitrantVerify
} from "./components"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/Js/Header/Header"
import Footer from "./components/Js/Footer/Footer"
import { verify } from "./components/Js/helpers"

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
            {!isLogin ? <Login /> : <RegistrantTable /> }
          </Route>
          <Route path="/regist-table" exact={true}>
            {isLogin ? <RegistrantTable /> : <Redirect to="/login" />}            
          </Route>
          <Route path="/regist-card/:id" exact={true}>
            <RegistrantCard />    
          </Route>
          <Route path="/regist-verify/:id" exact={true}>
            <RegsitrantVerify />    
          </Route>
          <Route path="/add-admin" exact={true}>
            {!isLogin ? <Redirect to="/login" /> : verify().role == "admin" ? <RegistrantTable /> : <AddAdmin />}            
          </Route>
        </Route>        
      </Switch>
      <Footer />
    </Router> 
  );
}

export default App;
