import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,  
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, ErrorMessage, Form, Field  } from "formik";
import Swal from "sweetalert2"
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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();

  const DatePickerField = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
  
    return (
      <KeyboardDatePicker
        clearable      
        name={field.name}
        value={field.value}
        format="dd/MM/yyyy"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={error => {
          // handle as a side effect
          if (error !== currentError) {
            form.setFieldError(field.name, error);
          }
        }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={date => form.setFieldValue(field.name, date, false)}
        {...other}
      />
    );
  };

  return (
    <Formik
    initialValues={{
      fullName: "",
      nisn: "",
      bornPlace: "",
      date: new Date(),
      fromSchool: "",
      facultyFirst: "",
      facultySecond: "",
      checkVerifyBiodata: ""
    }} 
    onSubmit={values => {      
      console.log(values.fullName)
      console.log(values.nisn)
      console.log(values.bornPlace)
      console.log(values.date)
      console.log(values.fromSchool)
      console.log(values.facultyFirst)
      console.log(values.facultySecond)
      console.log(values.checkVerifyBiodata)
    }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => (
        <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate
      >        
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SMKN 1 Nawangan
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            PPDB Online 2020
          </Typography>
      <React.Fragment>
      <Typography variant="h6" style={{marginTop:"20px"}} gutterBottom>
        Biodata
      </Typography>      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Nama lengkap"
            fullWidth
            required
            autoComplete="fname"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.fullName}                        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nisn"
            name="nisn"
            label="NIS"
            fullWidth
            autoComplete="nisn"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.nisn}  
            type="number"          
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bornPlace"
            name="bornPlace"
            label="Tempat lahir"
            fullWidth
            autoComplete="billing address-level2"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.bornPlace}            
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
        <Grid item xs={12}>
          <TextField
            required
            id="fromSchool"
            name="fromSchool"
            label="Asal Sekolah"
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.fromSchool}
            autoComplete="fromSchool"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography style={{marginTop:"20px"}}>
            Pilihan Jurusan
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jurusan utama</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="facultyFirst"
          name="facultyFirst"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue={values.facultyFirst}
          autoComplete="facultyFirst"
        >
          <MenuItem value={10}>Akutansi (AKL)</MenuItem>
          <MenuItem value={20}>Tata Busana (TB)</MenuItem>
          <MenuItem value={30}>Otomotif (TKRO)</MenuItem>
          <MenuItem value={40}>Pertanian (ATPH)</MenuItem>
          <MenuItem value={50}>Kria Kayu (KKKR)</MenuItem>
        </Select>
      </FormControl>           
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jurusan kedua</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="facultySecond"
          name="facultySecond"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue={values.facultySecond}
          autoComplete="facultySecond"
        >
          <MenuItem value={60}>Akutansi (AKL)</MenuItem>
          <MenuItem value={70}>Tata Busana (TB)</MenuItem>
          <MenuItem value={80}>Otomotif (TKRO)</MenuItem>
          <MenuItem value={90}>Pertanian (ATPH)</MenuItem>
          <MenuItem value={100}>Kria Kayu (KKKR)</MenuItem>
        </Select>
      </FormControl>           
      </Grid>      
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox 
              id="checkVerifyBiodata"
              color="secondary" 
              name="checkVerifyBiodata" 
              value="yes"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.checkVerifyBiodata}
              autoComplete="checkVerifyBiodata" />}
            label="Saya menyatakan bahwa data diatas memang betul data pribadi saya"
          />
        </Grid>        
      </Grid>
    </React.Fragment>
          <React.Fragment>                          
                <div className={classes.buttons}>                                                        
                  <Button
                    variant="contained"
                    color="primary"                    
                    className={classes.submit}
                    type="submit"
                  >
                    Daftar
                  </Button>
                </div>                        
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
    </form>
    )}
    </Formik>
  );
}