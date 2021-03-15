import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import OutTextField from "../../../components/Textfield/Textfield";
import OutButton from "../../../components/Button/Button";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CheckIcon from "@material-ui/icons/Check";

import { Link as LinkRouter, withRouter, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../actions/application";

import swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#42b983",
    margin: theme.spacing(1),
  },
  cardLogin: {
    border: "1px solid",
    borderColor: "#aba8a7",
    borderRadius: "10px",
    minWidth: "150px",
    maxHeight: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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
}));

function SignIn(props) {
  const classes = useStyles();
  const [isPendaftar, setIsPendaftar] = React.useState(true);
  const [loginData, setLoginData] = React.useState([]);
  const [compPendaftar, setCompPendaftar] = React.useState({
    backgroundColor: "#42b983",
    color: "white",
  });
  const [compPanitia, setCompPanitia] = React.useState({
    backgroundColor: "white",
    color: "black",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const userAfterLogin = useSelector((state) => state);
  console.log("setAfterLogin", userAfterLogin);

  useEffect(() => {
    setLoginData(userAfterLogin);
  }, [userAfterLogin]);

  const submitLogin = (values) => {
    dispatch(adminLogin(values, history));
  };

  const initIsPendaftar = (type) => {
    switch (type) {
      case "pendaftar":
        setIsPendaftar(true);
        setCompPendaftar({ backgroundColor: "#42b983", color: "white" });
        setCompPanitia({ backgroundColor: "white", color: "black" });
        break;
      case "panitia":
        setIsPendaftar(false);
        setCompPendaftar({ backgroundColor: "white", color: "black" });
        setCompPanitia({ backgroundColor: "#42b983", color: "white" });
        break;
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box display="flex">
          <div
            style={compPendaftar}
            className={classes.cardLogin}
            onClick={() => initIsPendaftar("pendaftar")}
          >
            <Grid
              container
              style={{ flexFlow: "column nowrap" }}
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.avatar}>
                {isPendaftar === true ? <CheckIcon /> : <AccountCircleIcon />}
              </Avatar>
              <Typography component="h1" variant="h5">
                Pendaftar
              </Typography>
              <Box p={0.5} />
            </Grid>
          </div>
          <Box p={1} />
          <div
            style={compPanitia}
            className={classes.cardLogin}
            onClick={() => initIsPendaftar("panitia")}
          >
            <Grid
              container
              style={{ flexFlow: "column nowrap" }}
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.avatar}>
                {isPendaftar !== true ? <CheckIcon /> : <AssignmentIndIcon />}
              </Avatar>
              <Typography component="h1" variant="h5">
                Panitia
              </Typography>
              <Box p={0.5} />
            </Grid>
          </div>
        </Box>
        <Formik
          initialValues={{
            username: "",
            password: "",
            pin: "",
          }}
          validate=""
          onSubmit={(values) => {
            console.log("values login", values);
            if (
              values.username === "" ||
              values.password === "" ||
              values.pin
            ) {
              swal.fire({
                icon: "error",
                title: "Isikan data anda dengan benar saat login!",
              });
            } else {
              submitLogin(values);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <form className={classes.form} noValidate>
                <OutTextField
                  id="username"
                  autoComplete="username"
                  type="outlined"
                  label="Username"
                  name="username"
                  required={true}
                  defaultValue={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {isPendaftar ? (
                  <OutTextField
                    id="pin"
                    autoComplete="pin"
                    type="outlined"
                    label="PIN"
                    name="pin"
                    inputType="password"
                    required={true}
                    inputProps={{ maxLength: 6 }}
                    defaultValue={values.pin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : (
                  <OutTextField
                    id="password"
                    autoComplete="password"
                    type="outlined"
                    label="Password"
                    name="password"
                    inputType="password"
                    required={true}
                    inputProps={{ maxLength: 10 }}
                    defaultValue={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  // <TextField
                  //   className={classes.textField}
                  //   variant="outlined"
                  //   margin="normal"
                  //   required
                  //   fullWidth
                  //   name="password"
                  //   label="Password"
                  //   type="password"
                  //   id="password"
                  //   autoComplete="current-password"
                  //   defaultValue={values.password}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                  //   InputLabelProps={{
                  //     classes: {
                  //       root: classes.textFieldLabel,
                  //     },
                  //   }}
                  // />
                )}
              </form>
              <Box marginTop={1.5}>
                <OutButton
                  label="Login"
                  variant="contained"
                  backgroundColor="#42b983"
                  type="submit"
                  fullWidth={true}
                  disabled={userAfterLogin.loading}
                />
              </Box>
              <Box marginTop={1}>
                <OutButton
                  label="Kembali"
                  variant="contained"
                  backgroundColor="#0d2538"
                  fullWidth={true}
                  component={LinkRouter}
                  to="/ppdb"
                />
              </Box>
            </form>
          )}
        </Formik>
        <Grid container justify="flex-end">
          <Typography variant="body2">Lupa password? Ganti</Typography>
        </Grid>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

export default withRouter(SignIn);
