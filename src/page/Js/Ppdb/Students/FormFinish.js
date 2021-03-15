import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, CssBaseline } from "@material-ui/core";
import OutButton from "../../../../components/Button/Button";

import { Link } from "react-router-dom";

import SvgPpdbOne from "../../../../assets/svg/form-finish-1.svg";

const useStyles = makeStyles((theme) => ({
  gridMargin: {
    marginTop: 40,
  },
  gridDate: {
    marginRight: 5,
    marginTop: 20,
    backgroundColor: "#42b983",
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

function FormFinish() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.gridMargin}>
        <form>
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={6}>
                    <Grid container justify="center">
                      <Box p={1}>
                        <div>
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
                    <Grid container justify="center">
                      <Box p={1}>
                        <div>
                          <Grid>
                            <Typography
                              className={classes.boldTypographyH5}
                              variant="h4"
                            >
                              Hai Fadil,
                            </Typography>
                            <Typography
                              style={{ textAlign: "left", marginTop: "15px" }}
                              variant="h6"
                            >
                              Selamat, pendaftaran PPDB SMKN 1 Nawangan anda
                              telah berhasil. Silahkan menunggu notifikasi dari
                              kami untuk hasil pendaftaran anda. Silahkan untuk
                              klik detail untuk melihat form anda.
                            </Typography>
                          </Grid>
                          <Grid container justify="flex-end">
                            <Box marginTop={3}>
                              <OutButton
                                label="Detail"
                                variant="contained"
                                backgroundColor="#42b983"
                                fullWidth={false}
                                component={Link}
                                to="/ppdb/students/form-biodata"
                              />
                            </Box>
                          </Grid>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </main>
          </React.Fragment>
        </form>
      </div>
    </div>
  );
}

export default FormFinish;
