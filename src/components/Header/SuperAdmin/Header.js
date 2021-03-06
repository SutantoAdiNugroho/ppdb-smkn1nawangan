import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Main from "./Main";
import { Link } from "react-router-dom";

import swal from "sweetalert2";
import ImageLogo from "../../../assets/img/logo-921.png";

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
  logo: {
    maxWidth: 60,
    marginRight: 5,
    marginLeft: -10,
  },
}));

const logOut = () => {
  localStorage.removeItem("token");
  swal
    .fire({
      title: "Anda berhasil logout",
      icon: "success",
    })
    .then((result) => {
      window.location.reload();
    });
};

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{}}>
            <Main />
          </Typography>
          <img src={ImageLogo} className={classes.logo} alt="Logo" />
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            SMKN 1 Example
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={logOut}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
