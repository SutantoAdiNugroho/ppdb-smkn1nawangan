import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuestHeader from "./Guest/Header";
import AdminHeader from "./Admin/Header"

function Header() {
  return (
    <Fragment>
      {JSON.parse(localStorage.getItem("token")) === null ? (
        <GuestHeader />
      ) : (
        <AdminHeader />
      )}
    </Fragment>
  );
}

export default withRouter(Header);
