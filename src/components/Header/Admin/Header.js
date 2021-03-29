import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Main from "./Main";

import swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#000000",
    "&:hover": {
      color: "#000000",
    },
  },
}));

function HeaderLogout(props) {
  const classes = useStyles();

  const logOut = () => {
    swal
      .fire({
        title: "Anda berhasil logout",
        icon: "success",
      })
      .then((res) => {
        localStorage.removeItem("token");
        props.history.push("/ppdb/login");
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{}}>
            <Main />
          </Typography>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            SMKN 1 Nawangan
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={logOut}
            component={Link}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(HeaderLogout);
