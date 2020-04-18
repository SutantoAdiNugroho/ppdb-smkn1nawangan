import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from "react-router-dom";
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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Checkout(props) {
  const classes = useStyles();  
  let urlLoginLive = "https://ppdb-smkn1nawangan-back.herokuapp.com/";
  const disableBtnProps = {};
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
          if (error !== currentError) {
            form.setFieldError(field.name, error);
          }
        }}        
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
      let nisn = values.nisn.toString().substr(3, 7)
      let myName = values.fullName.substr(0, 2).toUpperCase();
      let myId = `PPDB${myName}${nisn}`      

      let myNisn = values.nisn.toString()

      let facultyFirst
      let facultySecond      

      switch (values.facultyFirst) {
        case 10:
          facultyFirst = "Akuntansi (AKL)"
          break;
        case 20:
          facultyFirst = "Tata Busana (TB)"
          break;      
        case 30:
          facultyFirst = "Otomotif (TKRO)"
          break;
        case 40:
          facultyFirst = "Pertanian (ATPH)"
          break;
        case 50:
          facultyFirst = "Kria Kayu (KKKR)"
          break;
        default:
          break;
      }

      switch (values.facultySecond) {
        case 60:
          facultySecond = "Akuntansi (AKL)"
          break;
        case 70:
          facultySecond = "Tata Busana (TB)"
          break;      
        case 80:
          facultySecond = "Otomotif (TKRO)"
          break;
        case 90:
          facultySecond = "Pertanian (ATPH)"
          break;
        case 100:
          facultySecond = "Kria Kayu (KKKR)"
          break;
        default:
          break;
      }

      let dateBorn      
      let getFullYear = new Date(values.date).getFullYear()  
      let getMonth = new Date(values.date).getMonth()+1
      let getDay = new Date(values.date).getDate()
      dateBorn = `${getDay}/${getMonth}/${getFullYear}`

      let fullYearNow = new Date().getFullYear()
      let ageValidation = fullYearNow - getFullYear      

      let checkVerify = values.checkVerifyBiodata.toString()

      if (values.fullName == "" || values.nisn == "" || values.bornPlace == "" || values.date == "" || values.fromSchool == "" || facultyFirst == "" || facultySecond == "" || facultyFirst == undefined || facultySecond == undefined) {
        Swal.fire({
          icon: 'error',
          title: 'Mohon isikan data diri anda dengan benar'
        })
      } else if (values.checkVerifyBiodata != "yes") {
        Swal.fire({
          icon: 'error',
          title: 'Silahkan centang pernyataan di form tentang data diri anda'
        })
      } else if (ageValidation <=13 ) {
        Swal.fire({
          icon: 'error',
          title: 'Maaf umur anda belum mencukupi'
        })
      } else if (facultyFirst == facultySecond) {
        Swal.fire({
          icon: 'error',
          title: 'Jurusan utama dan jurusan kedua tidak boleh sama!'
        })
      } else if (myNisn.length < 9 ) {
        Swal.fire({
          icon: 'error',
          title: 'Mohon masukkan NISN anda dengan benar'
        })
      } else {  
        let timerInterval
        Swal.fire({
          title: 'Silahkan tunggu..',              
          timer: 9999999,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {          
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })                     
        axios
          .post(`${urlLoginLive}ppdb`, {idRegister:myId, fullName:values.fullName, nisn:values.nisn, bornPlace:values.bornPlace, dateBorn:dateBorn, fromSchool:values.fromSchool, facultyFirst:facultyFirst, facultySecond:facultySecond, checkVerifyBiodata:checkVerify})
          .then(response => {
            console.log(response.data.data)
            let idRegistrant = response.data.data
            console.log(idRegistrant._id)
            if (response.status == 200) {                   
              Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Berhasil',
                text: 'Selamat pendaftaran PPDB anda di SMKN 1 Nawangan berhasil',
              }).then(result => {
                props.history.push(`regist-card/${idRegistrant._id}`);
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Pendaftaran gagal, silahkan coba kembali'
              })
            }
          }).catch(error => {
            Swal.fire({
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
            label="NISN"
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
          <MenuItem value={10}>Akuntansi (AKL)</MenuItem>
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
          <MenuItem value={60}>Akuntansi (AKL)</MenuItem>
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
                    style={{marginTop:"20px"}}                    
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

export default withRouter(Checkout)