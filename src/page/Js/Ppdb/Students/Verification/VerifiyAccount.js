import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, CssBaseline } from "@material-ui/core";

import OutButton from "../../../../../components/Button/Button";

import { Link, withRouter } from "react-router-dom";

import SvgPpdbOne from "../../../../../assets/svg/verified-ppdb-1.svg";

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
  typoLogin: {
    color: "#000000",
    "&:hover": {
      color: "#42b983",
    },
    textDecoration: "none",
  },
}));

function VerifyAccount({ match }) {
  const classes = useStyles();
  console.log("match verify acc", match);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={5}>
          <Grid container justify="center">
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
        <Grid item xs={12} sm={7}>
          <Grid container justify="flex-start">
            <Box p={1}>
              <div className={classes.gridMargin}>
                <Grid>
                  <Typography className={classes.boldTypographyH5} variant="h4">
                    Selamat, email kamu berhasil ter-verifikasi!
                  </Typography>
                  <Typography
                    style={{ textAlign: "left", marginTop: "15px" }}
                    variant="h6"
                  >
                    Hai Fadil, email kamu telah ter-verifikasi oleh sistem kami.
                    Silahkan lanjutkan proses pendaftaran PPDB SMKN 1 Nawangan
                    dengan Login menggunakan Username dan PIN kamu. Klik tombol
                    Login dibawah untuk mulai.
                  </Typography>
                </Grid>
                <Grid container justify="flex-start">
                  <Box marginTop={3}>
                    <OutButton
                      label="Login"
                      variant="contained"
                      backgroundColor="#42b983"
                      fullWidth={false}
                      component={Link}
                      to="/ppdb/login"
                    />
                  </Box>
                </Grid>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(VerifyAccount);
