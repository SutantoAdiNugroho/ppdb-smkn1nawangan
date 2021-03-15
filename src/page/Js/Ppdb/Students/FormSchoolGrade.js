import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Videocam from "@material-ui/icons/Videocam";

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
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Scan Ijazah", 159, 6.0, 24, 4.0),
  createData("Scan SKHU", 237, 9.0, 37, 4.3),
];

function FormSchoolGrade() {
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
              Form Nilai
            </Typography>
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "20px" }}
                    gutterBottom
                  >
                    Upload Nilai
                  </Typography>
                  <div className={classes.formMargin}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <OutTextfield
                          type="standard"
                          label="Asal Sekolah"
                          name="fromSchool"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <OutTextfield
                          type="standard"
                          label="Rata-rata nilai UN"
                          name="unAverage"
                          inputType="number"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <OutTextfield
                          type="standard"
                          label="Rata-rata nilai raport"
                          name="raportAverage"
                          inputType="number"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box marginTop={5}>
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Dokumen</TableCell>
                                  <TableCell align="right">
                                    Status Verifikasi
                                  </TableCell>
                                  <TableCell align="right">Action</TableCell>
                                  <TableCell align="right">Detail</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.fat}
                                    </TableCell>
                                    <TableCell align="right">
                                      <Button
                                        variant="contained"
                                        component="label"
                                        size="small"
                                      >
                                        Upload
                                        <input type="file" hidden />
                                      </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Button
                                        variant="contained"
                                        component="label"
                                        size="small"
                                        disabled
                                      >
                                        Detail
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                        {/* <Button variant="contained" component="label">
                          Upload File
                          <input type="file" hidden />
                        </Button> */}
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

export default FormSchoolGrade;
