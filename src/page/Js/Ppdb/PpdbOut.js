import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
  InlineDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FieldPhoneNumber from "material-ui-phone-number";

import { Formik, Field, withFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import * as Yup from "yup";

let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;
let isFacultyFirst = true;
let opsFstFaculty = [
  "Akuntansi (AKL)",
  "Tata Busana (TB)",
  "Otomotif (TKRO)",
  "Pertanian (ATPH)",
  "Kria Kayu (KKKR)",
];
let opsSecFaculty = [];

const useStyles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  buttonRes: {
    marginRight: 5,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  const currentVal = null;
  return (
    <KeyboardDatePicker
      clearable
      name={field.name}
      value={currentVal}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};

const listYearDrp = (event) => {
  let minOffset = 0,
    maxOffset = 5;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }
  const yearList = allYears.map((x) => {
    return (
      <MenuItem key={x} value={x}>
        {x}
      </MenuItem>
    );
  });

  return yearList;
};

const handleClickFaculty = (event) => {
  let faculFrst = event.target;
  isFacultyFirst = false;
  opsSecFaculty = [];

  switch (faculFrst.value) {
    case 0:
      opsSecFaculty.push(
        "Tata Busana (TB)",
        "Otomotif (TKRO)",
        "Pertanian (ATPH)",
        "Kria Kayu (KKKR)"
      );
      break;
    case 1:
      opsSecFaculty.push(
        "Akuntansi (AKL)",
        "Otomotif (TKRO)",
        "Pertanian (ATPH)",
        "Kria Kayu (KKKR)"
      );
      break;
    case 2:
      opsSecFaculty.push(
        "Akuntansi (AKL)",
        "Tata Busana (TB)",
        "Pertanian (ATPH)",
        "Kria Kayu (KKKR)"
      );
      break;
    case 3:
      opsSecFaculty.push(
        "Akuntansi (AKL)",
        "Tata Busana (TB)",
        "Otomotif (TKRO)",
        "Kria Kayu (KKKR)"
      );
      break;
    case 4:
      opsSecFaculty.push(
        "Akuntansi (AKL)",
        "Tata Busana (TB)",
        "Otomotif (TKRO)",
        "Pertanian (ATPH)"
      );
      break;
    default:
      break;
  }
};

const FormLogin = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h5" align="center">
              PPDB Online 2020
            </Typography>
            <React.Fragment>
              <Typography
                variant="h6"
                style={{ marginTop: "20px" }}
                gutterBottom
              >
                Biodata
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="fullName"
                    name="fullName"
                    label="Nama lengkap"
                    value={values.fullName}
                    autoComplete="fname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.fullName ? errors.fullName : ""}
                    error={touched.fullName && Boolean(errors.fullName)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nisn"
                    name="nisn"
                    label="NISN"
                    autoComplete="nisn"
                    value={values.nisn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.nisn ? errors.nisn : ""}
                    error={touched.nisn && Boolean(errors.nisn)}
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="bornPlace"
                    name="bornPlace"
                    label="Tempat lahir"
                    autoComplete="billing address-level2"
                    value={values.bornPlace}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.bornPlace ? errors.bornPlace : ""}
                    error={touched.bornPlace && Boolean(errors.bornPlace)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <Field
                        fullWidth
                        label="Tanggal lahir"
                        name="date"
                        component={DatePickerField}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FieldPhoneNumber
                    id="phoneNumber"
                    label="Nomor Telefon"
                    name="phoneNumber"
                    data-cy="user-phone"
                    defaultCountry={"id"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tahun Lulus
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="yearGrad"
                      name="yearGrad"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.yearGrad}
                      autoComplete="yearGrad"
                    >
                      {listYearDrp()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="fromSchool"
                    name="fromSchool"
                    label="Asal Sekolah"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fromSchool}
                    helperText={touched.fromSchool ? errors.fromSchool : ""}
                    error={touched.fromSchool && Boolean(errors.fromSchool)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ marginTop: "20px" }}>
                    Pilihan Jurusan
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Jurusan utama
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="facultyFirst"
                      name="facultyFirst"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.facultyFirst}
                      autoComplete="facultyFirst"
                      onClick={(event) => handleClickFaculty(event)}
                    >
                      {opsFstFaculty.map((option, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {option}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Jurusan kedua
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="facultySecond"
                      name="facultySecond"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.facultySecond}
                      autoComplete="facultySecond"
                      disabled={isFacultyFirst}
                    >
                      {opsSecFaculty.map((option, index) => {
                        return <MenuItem value={index + 5}>{option}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="checkVerifyBiodata"
                        color="secondary"
                        name="checkVerifyBiodata"
                        value="yes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.checkVerifyBiodata}
                        autoComplete="checkVerifyBiodata"
                      />
                    }
                    label="Saya menyatakan bahwa data diatas memang betul data pribadi saya"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonRes}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Daftar
                </Button>
              </div>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </form>
  );
};

const FormikLogin = withFormik({
  mapPropsToValues: ({
    fullName,
    nisn,
    bornPlace,
    fromSchool,
    phoneNumber,
    yearGrad,
    facultyFirst,
    facultySecond,
  }) => {
    return {
      fullName: fullName || "",
      nisn: nisn || "",
      bornPlace: bornPlace || "",
      fromSchool: fromSchool || "",
      phoneNumber: phoneNumber || "",
      yearGrad: yearGrad || "",
      facultyFirst: facultyFirst || "",
      facultySecond: facultySecond || "",
    };
  },

  validationSchema: Yup.object().shape({
    fullName: Yup.string().required("Mohon isikan nama lengkap"),
    nisn: Yup.string()
      .required("Mohon isikan NISN")
      .min(10, "NISN harus berupa 10 angka"),
    bornPlace: Yup.string().required("Mohon isikan tempat lahir"),
    fromSchool: Yup.string().required("Mohon isikan asal sekolah"),
    phoneNumber: Yup.string().min(8, "Nomor Telefon minimal 8 angka"),
    facultyFirst: Yup.string()
      .oneOf(["10", "20", "30", "40", "50"])
      .required("Mohon isikan jurusan pertama"),
    facultySecond: Yup.string().required("Mohon isikan jurusan kedua"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    console.log("Values", values);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000)
  },
})(FormLogin);

export default withRouter(withStyles(useStyles)(FormikLogin));
