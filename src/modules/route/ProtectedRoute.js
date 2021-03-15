import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { verify } from "../helpers/verifyToken";

const ProtectedRoute = ({
  component: Component,
  secondComp: SecondComp,
  thirdComp: ThirdComp,
  ...props
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getToken() {
    const token = await localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    getToken();
  }, []);

  console.log("check props", props);

  return (
    <React.Fragment>
      {props.type === "triple" ? (
        <Route
          {...props}
          render={(props) =>
            !isLoggedIn ? (
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
            isLoggedIn ? <Component {...props} /> : <SecondComp {...props} />
          }
        />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
