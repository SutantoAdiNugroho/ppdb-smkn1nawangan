import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Burger from "./Burger";

import ImageLogo from "../../../assets/img/logo192.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 70,
  },
  appBarPos: {
    position: "fixed",
    zIndex: theme.zIndex.appBar - 50,
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
    maxWidth: 40,
    marginRight: 10,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarPos} position="sticky" color="default">
        <Toolbar>
          <img src={ImageLogo} className={classes.logo} alt="Logo" />
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            SMKN 1 Nawangan
          </Typography>
          {/* <Button
            component={Link}
            to="/login"
            color="primary"
            size="small"
            variant="contained"
          >
            Panitia
          </Button> */}
          <Burger />
        </Toolbar>
      </AppBar>
    </div>
  );
}
