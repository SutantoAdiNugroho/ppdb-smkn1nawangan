import React from 'react';
import './App.css';
import {
  PpdbOut, 
  Login,
  AdminDash,
  RegistrantTable, 
  RegistrantCard, 
  AddAdmin, 
  RegsitrantVerify,
  RegistrantSuccess
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

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const isLogin = localStorage.getItem("token");

  return (   
    <Router>
      <Header />
      <Switch>
        <Route>
          <Route path="/" exact={true}>
            {!isLogin ? <PpdbOut /> : <AdminDash /> }
          </Route>
          <Route path="/login" exact={true}>
            {!isLogin ? <Login /> : <RegistrantTable /> }
          </Route>
          <Route path="/regist-table" exact={true}>
            {isLogin ? <RegistrantTable /> : <Redirect to="/login" />}
          </Route>
          <Route path="/regist-success" exact={true}>
            {isLogin ? <RegistrantSuccess /> : <Redirect to="/login" />}
          </Route>
          <Route path="/regist-card/:id" exact={true}>
            <RegistrantCard />    
          </Route>
          <Route path="/regist-verify/:id" exact={true}>
            {isLogin ? <RegsitrantVerify /> : <Redirect to="/login" />}            
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

// window.onbeforeunload = function(e) {
  //   window.localStorage.unloadTime = JSON.stringify(new Date());
  // }

  // window.onload = function () {

  //   let loadTime = new Date();
  //   let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
  //   let refreshTime = loadTime.getTime() - unloadTime.getTime();

  //   console.log(refreshTime)
    
  //   if(refreshTime>5000) {//3000 milliseconds 
  //     window.localStorage.removeItem("token");
  //   }
    
  // };