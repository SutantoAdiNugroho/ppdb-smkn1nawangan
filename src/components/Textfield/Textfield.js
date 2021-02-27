import React from "react";
import { FormControl, Input, InputLabel, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#42b983",
      color: "#42b983",
    },
  },
  textFieldLabel: {
    "&.Mui-focused": {
      color: "#42b983",
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#42b983",
    },
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#42b983",
    },
  },
}));

const OutTextfield = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.type === "standard" ? (
        <FormControl fullWidth>
          <InputLabel
            htmlFor="custom-css-standard-input"
            classes={{ root: classes.cssLabel, focused: classes.cssFocused }}
            required={props.required}
          >
            {props.label}
          </InputLabel>
          <Input
            id="custom-css-standard-input"
            name={props.name}
            required={props.required}
            inputMode={props.inputMode !== undefined ? props.inputMode : ""}
            type={props.inputType !== undefined ? props.inputType : ""}
            inputProps={props.inputProps !== undefined ? props.inputProps : ""}
            classes={{ underline: classes.cssUnderline }}
          />
        </FormControl>
      ) : (
        <TextField
          fullWidth
          className={classes.textField}
          variant={props.type}
          margin="normal"
          required={props.required}
          name={props.name}
          label={props.label}
          type={props.inputType !== undefined ? props.inputType : ""}
          id={props.id}
          autoComplete={props.autoComplete}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          onBlur={props.onBlur}
          inputProps={props.inputProps !== undefined ? props.inputProps : ""}
          InputLabelProps={{
            classes: {
              root: classes.textFieldLabel,
            },
          }}
        />
      )}
    </div>
  );
};

export default OutTextfield;
