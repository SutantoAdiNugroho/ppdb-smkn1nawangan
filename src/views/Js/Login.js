import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as LinkRouter, withRouter } from "react-router-dom";
import { Formik } from "formik";
import swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

import { axiosReportsUsers } from "../../modules/helpers/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const disableBtnProps = {};
  let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

  const handleSendMail = () => {
    swal
      .fire({
        title: "Biodata Requestor",
        html: `<input type="text" id="fullName" class="swal2-input" placeholder="Nama Lengkap">
      <input type="email" id="email" class="swal2-input" placeholder="Email">`,
        confirmButtonText: "Proses",
        focusConfirm: false,
        preConfirm: () => {
          const login = swal.getPopup().querySelector("#fullName").value;
          const password = swal.getPopup().querySelector("#email").value;

          if (!login || !password) {
            swal.showValidationMessage(
              `Silahkan masukkan nama lengkap dan email`
            );
          } else if (!password.match(/^\S+@\S+\.\S+$/)) {
            swal.showValidationMessage(`Silahkan masukkan email yang valid`);
          }
          return { login: login, password: password };
        },
      })
      .then((result) => {
        try {
          const fullName = result.value.login;
          const email = result.value.password;

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
            .post(`${urlLoginLive}auth/add/requestor`, {
              nameRequestor: fullName,
              email: email,
            })
            .then((res) => {
              swal.fire({
                icon: "success",
                title: "Permintaan Berhasil Dikirim",
              });
            })
            .catch((error) => {
              swal.fire({
                icon: "error",
                title: "Gagal mengirim data, silahkan coba kembali",
              });
            });
        } catch (error) {
          console.log("popup closed");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login Panitia
        </Typography>
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
                .post(`${urlLoginLive}auth/admin/login`, values)
                .then((response) => {
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
                })
                .catch((error) => {

                  try {
                    const resp = error.response.status;

                    switch (resp) {
                      case 401:
                        swal.fire({
                          icon: "error",
                          title: "Password salah, silahkan coba kembali",
                        });
                        break;
                      case 404:
                        swal.fire({
                          icon: "error",
                          title: "Username tidak terdaftar",
                        });
                        break;
                      default:
                        break;
                    }
                  } catch (error) {
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
              <TextField
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
              />
              <TextField
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        <Button
          style={{ marginTop: "0px" }}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          component={LinkRouter}
          to="/"
        >
          Kembali
        </Button>
        <Grid item xs={12}>
          <Typography>
            <Link
              className={classes.typoLogin}
              onClick={() => handleSendMail()}
            >
              Klik disini
            </Link>{" "}
            untuk mendapatkan akun
          </Typography>
        </Grid>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

export default withRouter(SignIn);
