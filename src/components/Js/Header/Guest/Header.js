import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();  

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>          
          <Typography variant="h6" className={classes.title}>
            SMKN 1 Nawangan
          </Typography>
          <Button component={Link} to="/login" color="primary" size="small" variant="contained">Panitia</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}