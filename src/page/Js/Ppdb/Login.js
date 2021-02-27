import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CheckIcon from "@material-ui/icons/Check";

import { Link as LinkRouter, withRouter } from "react-router-dom";
import { Formik } from "formik";

import swal from "sweetalert2";
import axios from "axios";

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
    // "&:hover": {
    //   backgroundColor: "#42b983",
    //   color: "white",
    // },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonRes: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#0d2538",
    color: "white",
  },
  buttonReg: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#42b983",
    color: "white",
  },
  textField: {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "green",
    // },
    // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "red",
    // },
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
  const [compPendaftar, setCompPendaftar] = React.useState({
    backgroundColor: "#42b983",
    color: "white",
  });
  const [compPanitia, setCompPanitia] = React.useState({
    backgroundColor: "white",
    color: "black",
  });

  useEffect(() => {}, []);

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

  const disableBtnProps = {};
  let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

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
          }}
          validate=""
          onSubmit={(values) => {
            if (values.username === "" || values.password === "") {
              disableBtnProps.disabled = false;
              swal
                .fire({
                  icon: "error",
                  title: "Isikan data anda dengan benar saat login!",
                })
                .then((result) => {
                  disableBtnProps.disabled = false;
                });
            } else {
              let timerInterval;
              swal
                .fire({
                  title: "Silahkan tunggu..",
                  timer: 9999999,
                  timerProgressBar: true,
                  onBeforeOpen: () => {
                    swal.showLoading();
                    timerInterval = setInterval(() => {
                      const content = swal.getContent();
                      if (content) {
                        const b = content.querySelector("b");
                        if (b) {
                          b.textContent = swal.getTimerLeft();
                        }
                      }
                    }, 100);
                  },
                  onClose: () => {
                    clearInterval(timerInterval);
                  },
                })
                .then((result) => {
                  if (result.dismiss === swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
              axios
                .post(`${urlLoginLive}admin/login`, values)
                .then((response) => {
                  if (response.data.message === "username not registered!") {
                    disableBtnProps.disabled = false;
                    swal.fire({
                      icon: "error",
                      title: "Username tidak terdaftar",
                    });
                  } else if (response.data.message === "Password is wrong!") {
                    swal.fire({
                      icon: "error",
                      title: "Password salah, silahkan coba kembali",
                    });
                  } else {
                    if (response.data.message === "Login successfull") {
                      swal
                        .fire({
                          icon: "success",
                          title: "Login Berhasil",
                        })
                        .then((result) => {
                          localStorage.setItem(
                            "token",
                            JSON.stringify(response.data.data.token)
                          );
                          props.history.push("/");
                          window.location.reload();
                        });
                    }
                  }
                })
                .catch((error) => {
                  if (error === "Error: Network Error") {
                    swal.fire({
                      icon: "error",
                      title: "Login gagal, silahkan cek koneksi anda",
                    });
                  } else {
                    swal.fire({
                      icon: "error",
                      title: "Login gagal, silahkan coba kembali",
                    });
                  }
                });
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
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  defaultValue={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    classes: {
                      root: classes.textFieldLabel,
                    },
                  }}
                />
                {isPendaftar ? (
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
                    defaultValue={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabel,
                      },
                    }}
                  />
                ) : (
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    defaultValue={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabel,
                      },
                    }}
                  />
                )}
              </form>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="#42b983"
                className={classes.buttonReg}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
        <Button
          style={{ marginTop: "0px" }}
          fullWidth
          variant="contained"
          // color="secondary"
          className={classes.buttonRes}
          component={LinkRouter}
          to="/ppdb"
        >
          Kembali
        </Button>
        <Grid container justify="flex-end">
          <Typography variant="body2">Lupa password? Ganti</Typography>
        </Grid>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

export default withRouter(SignIn);
