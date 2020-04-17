import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRouter, withRouter } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import swal from "sweetalert2"
import axios from "axios"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Admin © '}
      <Link color="inherit" href="https://material-ui.com/">
        SMKN 1 Nawangan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const disableBtnProps = {};  
  let urlLoginLive = "https://ppdb-smkn1nawangan-back.herokuapp.com/";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validate=""
        onSubmit={values => {            
          if (values.username === "" || values.password === "") {                  
            disableBtnProps.disabled = false;
            swal.fire({
                icon: 'error',
                title: "Isikan data anda dengan benar saat login!",
              }).then(result => {
                disableBtnProps.disabled = false;
              })
          } else {
            let timerInterval
            swal.fire({
              title: 'Silahkan tunggu..',              
              timer: 9999999,
              timerProgressBar: true,
              onBeforeOpen: () => {
                swal.showLoading()
                timerInterval = setInterval(() => {
                  const content = swal.getContent()
                  if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                      b.textContent = swal.getTimerLeft()
                    }
                  }
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
            axios
                .post(`${urlLoginLive}admin/login`, values)
                .then(response => {
                  console.log(response)
                  if (response.data.message == "username not registered!") {
                    disableBtnProps.disabled = false;
                    swal.fire({
                      icon: 'error',
                      title: "Username tidak terdaftar",
                    })
                  } else if (response.data.message == "Password is wrong!") {
                    swal.fire({
                      icon: 'error',
                      title: "Password salah, silahkan coba kembali",
                    })
                  } else {
                    if (response.data.message == "Login successfull") {
                      swal.fire({
                        icon: 'success',
                        title: 'Login Berhasil',
                    }).then((result) => {
                        localStorage.setItem(
                            "token",
                            JSON.stringify(response.data.data.token)
                        );
                        props.history.push("/");
                        window.location.reload();
                    })
                    }
                  }
                }).catch(error => {
                  swal.fire({
                    icon: 'error',
                    title: "Login gagal, silahkan coba kembali",
                  })
                })
          }                           
        }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}              
            >
        <form className={classes.form} noValidate>
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
        </form>
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
           style={{marginTop:"0px"}}            
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            component={LinkRouter}
            to="/"
          >
            Kembali
          </Button> 
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn);