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
  console.log("props textfield", props);
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
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pin"
          label="PIN"
          type="password"
          id="pin"
          autoComplete="current-password"
          //   defaultValue={values.password}
          //   onChange={handleChange}
          //   onBlur={handleBlur}
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
