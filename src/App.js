import React from "react";
import "./assets/css/main.css";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import {
  //Main
  Home,
  Contact,

  //PPDB
  HomePpdb,
  PpdbOut,
  Login,
  AdminDash,
  RegistrantTable,
  RegistrantCard,
  AddAdmin,
  RegsitrantVerify,
  RegistrantSuccess,
  StudentFormStart,
  StudentFormBiodata,
  StudentFormSchool,
  StudentFormSchoolGrade,
  StudentFormFinish,
  StudentFormChooseMajority,
  VerifyStudentAccount,
  DashSkeleton,

  //NotFound
  NotFound,
} from "./page";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ProtectedRoute } from "./modules/route";
import {
  FOURTH_COMPONENT,
  FOURTH_REDIRECT,
  TRIPLE_COMPONENT,
  TRIPLE_REDIRECT,
  DOUBLE,
} from "./modules/route/SectionAuth";

import Header from "./page/Js/Main/Header/Header";
import Footer from "./components/Footer/Footer";

import { verify } from "./modules/helpers";

function App() {
  const isLogin = localStorage.getItem("token");

  let theme = createMuiTheme({
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            type="triple"
            component={AdminDash}
            secondComp={StudentFormStart}
            thirdComp={Home}
          />
          <Route path="/ppdb/out" exact={true}>
            <PpdbOut />
          </Route>
          <Route path="/ppdb" exact={true}>
            <HomePpdb />
          </Route>
          <ProtectedRoute
            exact
            path="/ppdb/login"
            type="double"
            component={Login}
            redirectTo="/"
          />
          <ProtectedRoute
            exact
            path="/ppdb/admin/regist-table"
            type=""
            component={Login}
            redirectTo="/"
          />
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
            {!isLogin ? (
              <Redirect to="/login" />
            ) : verify().role === "admin" ? (
              <RegistrantTable />
            ) : (
              <AddAdmin />
            )}
          </Route>
          <Route path="/ppdb/students/form-start" exact={true}>
            <StudentFormStart />
          </Route>
          <Route path="/ppdb/students/form-biodata" exact={true}>
            <StudentFormBiodata />
          </Route>
          <Route path="/ppdb/students/form-school" exact={true}>
            <StudentFormSchool />
          </Route>
          <Route path="/ppdb/students/form-school-grade" exact={true}>
            <StudentFormSchoolGrade />
          </Route>
          <Route path="/ppdb/students/form-finish" exact={true}>
            <StudentFormFinish />
          </Route>
          <Route path="/ppdb/students/form-majority" exact={true}>
            <StudentFormChooseMajority />
          </Route>
          <Route path="/ppdb/students/verify/:id" exact={true}>
            <VerifyStudentAccount />
          </Route>
          <Route path="/dash-skele" exact={true}>
            <DashSkeleton />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
export default App;
