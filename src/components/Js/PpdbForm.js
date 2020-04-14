import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1.5),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AddressForm() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" style={{marginTop:"20px"}} gutterBottom>
        Biodata
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nama lengkap"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="NIS"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Tempat lahir"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">                    
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Tanggal lahir"
                    format="MM/dd/yyyy"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />                    
                </Grid>
        </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Asal Sekolah"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>  
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jurusan</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Akutansi (AKL)</MenuItem>
          <MenuItem value={20}>Tata Busana (TB)</MenuItem>
          <MenuItem value={30}>Otomotif (TKRO)</MenuItem>
          <MenuItem value={30}>Pertanian (ATPH)</MenuItem>
          <MenuItem value={30}>Kria Kayu (KKKR)</MenuItem>
        </Select>
      </FormControl>           
      </Grid>      
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Saya menyatakan bahwa data diatas memang betul data pribadi saya"
          />
        </Grid>        
      </Grid>
    </React.Fragment>
  );
}