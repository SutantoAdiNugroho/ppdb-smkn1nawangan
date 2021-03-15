import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import GuestHeader from "../../../../components/Header/Guest/Header";
import AdminHeader from "../../../../components/Header/Admin/Header";
import SuperAdminHeader from "../../../../components/Header/SuperAdmin/Header";

import { verify } from "../../../../modules/helpers";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const realTime = () => {
    const token = localStorage.getItem("token");

    if (JSON.parse(token) === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {    
    realTime();
  }, []);

  return (
    <Fragment>
      {!isLoggedIn ? (
        <GuestHeader />
      ) : verify().role === "admin" ? (
        <AdminHeader />
      ) : (
        <SuperAdminHeader />
      )}
    </Fragment>
  );
}

export default withRouter(Header);
