import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRouter, withRouter } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { registerValidation } from "../validation"
import swal from "sweetalert2"

import { axiosReportsUsers } from "../helpers"

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>        
        <Typography component="h1" variant="h5">
          Daftar Admin
        </Typography>
        <Formik
        initialValues={{
          fullName: "",  
          username: "",
          confirmPassword: "",
          password: ""          
        }}
        validate={registerValidation}
        onSubmit={values => {
            if (values.password != values.confirmPassword) {
                swal.fire({
                    icon: 'error',
                    title: 'Mohon samakan password'
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
                    if (result.dismiss === swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                }) 
                axiosReportsUsers()
                .post(`admin`, {fullName:values.fullName, username:values.username, password:values.password, role:"admin"})
                .then(response => {                    
                    swal.fire({
                        icon: 'success',
                        title: 'Pendaftaran admin berhasil'
                    }).then(result => {
                      document.getElementById('fullName').value = ""
                      document.getElementById('username').value = ""                      
                      document.getElementById('confirmPassword').value = ""
                      document.getElementById('password').value = ""
                    })
                    
                }).catch(error => {
                    swal.fire({
                    icon: 'error',
                    title: 'Pendaftaran gagal, silahkan coba kembali'
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
            id="fullName"
            label="Nama lengkap"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            defaultValue={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}            
          />        
          <a style={{color:"red", fontStyle:"italic"}} >
          <ErrorMessage name="fullName" />          
          </a>              
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
          <a style={{color:"red", fontStyle:"italic"}} >
            <ErrorMessage name="username" />          
          </a>              
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirmPassword"
            defaultValue={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <a style={{color:"red", fontStyle:"italic"}} >
            <ErrorMessage name="password" />          
          </a>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Konfirmasi password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />                             
        </form>
        <a style={{color:"red", fontStyle:"italic"}} >
            <ErrorMessage name="password" />          
        </a>
        <Button            
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}            
          >
            Tambah
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