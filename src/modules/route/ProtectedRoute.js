import React from "react";
import { Route, Redirect } from "react-router-dom";
import { verify } from "../helpers/verifyToken";
import {
  FOURTH_COMPONENT,
  FOURTH_REDIRECT,
  TRIPLE_COMPONENT,
  TRIPLE_REDIRECT,
  DOUBLE,
} from "./SectionAuth";

const ProtectedRoute = ({
  component: Component,
  secondComp: SecondComp,
  thirdComp: ThirdComp,
  ...props
}) => {
  console.log("check props", props);

  return (
    <React.Fragment>
      {props.type === "triple" ? (
        <Route
          {...props}
          render={(props) =>
            JSON.parse(localStorage.getItem("token")) === null ? (
              <ThirdComp {...props} />
            ) : verify().role === "admin" ? (
              <Component {...props} />
            ) : (
              <SecondComp {...props} />
            )
          }
        />
      ) : (
        <Route
          {...props}
          render={(props) =>
            JSON.parse(localStorage.getItem("token")) === null ? (
              <Component {...props} />
            ) : (
              <Redirect to={props.redirectTo} />
            )
          }
        />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
