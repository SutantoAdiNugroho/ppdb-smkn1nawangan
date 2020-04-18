import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuestHeader from "./Guest/Header";
import AdminHeader from "./Admin/Header";
import SuperAdminHeader from "./SuperAdmin/Header";
import { verify, axiosReportsUsers } from "../helpers"

function Header() {
  return (
    <Fragment>
      {JSON.parse(localStorage.getItem("token")) === null ? (
        <GuestHeader />
      ) : (
        (verify().role === "admin" ? <AdminHeader /> : <SuperAdminHeader />)
      )}
    </Fragment>
  );
}

export default withRouter(Header);
