import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Box,
  CssBaseline,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import OutTextfield from "../../../../components/Textfield/Textfield";
import OutButton from "../../../../components/Button/Button";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  gridMargin: {
    marginTop: 40,
  },
  gridDate: {
    marginRight: 5,
    marginTop: 20,
    backgroundColor: "#42b983",
  },
  boldTypographyH4: {
    fontWeight: "bold",
  },
  boldTypographyH5: {
    fontWeight: "bold",
    color: "#42b983",
  },
  svgGoals: {
    maxHeight: "300px",
    maxWidth: "100%",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  formMargin: {
    marginTop: 0,
  },
  buttons: {
    display: "flex",
    marginTop: 30,
  },
  typoLogin: {
    color: "#000000",
    "&:hover": {
      color: "#42b983",
    },
    textDecoration: "none",
  },
}));

function FormSchool() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedRadio, setSelectedRadio] = React.useState("female");

  const handleChangeRadio = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.root}>
      <div className={classes.gridMargin}>
        <form>
          <React.Fragment>
            <CssBaseline />
            <Typography variant="h5" align="center">
              Form Pendidikan
            </Typography>
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "20px" }}
                    gutterBottom
                  >
                    Ringkasan Data Diri
                  </Typography>
                  <div className={classes.formMargin}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <OutTextfield
                          type="standard"
                          label="Email"
                          name="email"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <OutTextfield
                          label="NISN"
                          type="standard"
                          name="nisn"
                          required={true}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                <Box marginTop={5} />
                <React.Fragment>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "20px" }}
                    gutterBottom
                  >
                    Pendidikan
                  </Typography>
                  <div className={classes.formMargin}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <OutTextfield
                          type="standard"
                          label="Asal Sekolah"
                          name="fromSchool"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Tingkatan Sekolah
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="facultyFirst"
                            name="facultyFirst"
                            autoComplete="facultyFirst"
                          >
                            <MenuItem key={1} value={"smp"}>
                              SMP
                            </MenuItem>
                            <MenuItem key={2} value={"kejarpaket2"}>
                              Kejar Paket 2
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            id="date-picker-dialog"
                            label="Tanggal Masuk"
                            views={["year", "month"]}
                            format="dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            id="date-picker-dialog"
                            label="Tanggal Lulus"
                            views={["year", "month"]}
                            format="dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Grid container justify="flex-end">
                      <Box p={0.5}>
                        <OutButton
                          label="Daftar"
                          variant="contained"
                          backgroundColor="#42b983"
                          type="submit"
                          fullWidth={false}
                        />
                      </Box>
                      <Box p={0.5}>
                        <OutButton
                          label="Reset"
                          variant="contained"
                          backgroundColor="#0d2538"
                          fullWidth={false}
                        />
                      </Box>
                    </Grid>
                  </div>
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        </form>
      </div>
    </div>
  );
}

export default FormSchool;
