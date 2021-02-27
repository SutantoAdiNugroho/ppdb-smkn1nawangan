import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = (props) =>
  makeStyles((theme) => ({
    buttonReg: {
      marginBottom: 5,
      backgroundColor: props.backgroundColor,
      color: "white",
      width: props.fullWidth ? "" : 100,
      "&:hover": {
        backgroundColor: props.backgroundColor,
        color: "white",
      },
    },
  }));

const OutButton = (props) => {
  console.log("props button", props);
  const classes = useStyles(props)();
  return (
    <div>
      {props.to !== undefined ? (
        <Button
          className={classes.buttonReg}
          variant={props.variant}
          type={props.type !== undefined ? props.type : ""}
          fullWidth={props.fullWidth}
          component={props.component}
          to={props.to}
        >
          {props.label}
        </Button>
      ) : (
        <Button
          className={classes.buttonReg}
          variant={props.variant}
          type={props.type !== undefined ? props.type : ""}
          fullWidth={props.fullWidth}
        >
          {props.label}
        </Button>
      )}
    </div>
  );
};

export default OutButton;
