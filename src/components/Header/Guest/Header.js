import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
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
            component={Link}
            to="/login"
            color="primary"
            size="small"
            variant="contained"
          >
            Panitia
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
