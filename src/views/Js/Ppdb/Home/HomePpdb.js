import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Badge as BadgeMaterial,
  Typography,
  Box,
  CssBaseline,
  TextField,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import SvgPpdbOne from "../../../../assets/svg/home-ppdb-1.svg";

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
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
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
  formMargin: {
    marginTop: 30,
  },
  buttons: {
    display: "flex",
    marginTop: 30,
  },
  buttonRes: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: "#0d2538",
    color: "white",
  },
  buttonReg: {
    marginBottom: 5,
    backgroundColor: "#42b983",
    color: "white",
  },
  typoLogin: {
    color: "#000000",
    "&:hover": {
      color: "#42b983",
    },
    textDecoration: "none",
  },
}));

function HomePpdb() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
            <Box p={1}>
              <div className={classes.gridMargin}>
                <img
                  className={classes.svgGoals}
                  src={SvgPpdbOne}
                  alt="SVG PPDB One"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-start">
            <Box p={1}>
              <div className={classes.gridMargin}>
                <Typography className={classes.boldTypographyH5} variant="h4">
                  Let's Join us
                </Typography>
                <Typography
                  style={{ textAlign: "left", marginTop: "15px" }}
                  variant="h6"
                >
                  SMK Negeri 1 Nawangan membuka penerimaan peserta didik baru
                  tahun ajaran 2021/2022, segera daftarkan diri untuk menjadi
                  bagian dari kami
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.gridMargin}>
        <form>
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography variant="h5" align="center">
                  Daftar PPDB 2021
                </Typography>
                <React.Fragment>
                  <div className={classes.formMargin}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstname"
                          name="firstname"
                          label="Nama Depan"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastname"
                          name="lastname"
                          label="Nama Belakang"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          inputMode="email"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="fromSchool"
                          name="fromSchool"
                          label="Asal Sekolah"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="password"
                          name="password"
                          label="PIN"
                          type="password"
                          inputProps={{ maxLength: 6 }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="password2"
                          name="password2"
                          label="Konfirmasi PIN"
                          type="password"
                          inputProps={{ maxLength: 6 }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Grid container justify="flex-start">
                      <Typography>
                        Sudah mendaftar?{" "}
                        <Link className={classes.typoLogin} to="/ppdb/login">
                          Login
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid container justify="flex-end">
                      <Button variant="contained" className={classes.buttonRes}>
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.buttonReg}
                        type="submit"
                      >
                        Daftar
                      </Button>
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

export default HomePpdb;
