import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import GuestHeader from "../../../../components/Header/Guest/Header";
import AdminHeader from "../../../../components/Header/Admin/Header";
import SuperAdminHeader from "../../../../components/Header/SuperAdmin/Header";

import { verify } from "../../../../modules/helpers";

function Header() {
  return (
    <Fragment>
      {JSON.parse(localStorage.getItem("token")) === null ? (
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
