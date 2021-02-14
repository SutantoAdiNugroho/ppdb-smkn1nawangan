import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Badge as BadgeMaterial,
  Typography,
  Box,
} from "@material-ui/core";
import { Carousel, Badge, Image, Row, Container, Col } from "react-bootstrap";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import EcoIcon from "@material-ui/icons/Eco";

import ImageOne from "../../../../assets/img/smk-slider-1.jpg";
import ImageTwo from "../../../../assets/img/smk-slider-2.jpg";
import ImageThree from "../../../../assets/img/smk-slider-3.jpg";
import ImageAdOne from "../../../../assets/img/adiwiyata-1.jpg";
import ImageAdTwo from "../../../../assets/img/adiwiyata-2.png";
import ImageAdThree from "../../../../assets/img/go-green-2.png";
import ImageAdFour from "../../../../assets/img/lingkungan-hidup-1.png";
import ImageAdFive from "../../../../assets/img/eco-masjid-1.png";
import ImageAdSix from "../../../../assets/img/lingkungan-hidup-2.png";
import ImageTutOne from "../../../../assets/img/tut-wuri-1.png";

import SvgGoals from "../../../../assets/svg/goals-1.svg";
import SvgAkuntansi from "../../../../assets/svg/jurusan-akuntansi.svg";
import SvgOtomotif from "../../../../assets/svg/jurusan-otomotif.svg";
import SvgPertanian from "../../../../assets/svg/jurusan-kria-kayu.svg";
import SvgKriaKayu from "../../../../assets/svg/jurusan-pertanian.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paper: {
      padding: theme.spacing(2),
    },
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    flexGrow: 1,
  },
  gridMargin: {
    marginTop: 20,
  },
  gridDate: {
    marginRight: 5,
    marginTop: 20,
    backgroundColor: "#42b983",
  },
  boldTypographyH4: {
    fontWeight: "bold",
    textAlign: "center",
  },
  boldTypographyH5: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#42b983",
  },
  svgGoals: {
    maxHeight: "400px",
    maxWidth: "100%",
    textAlign: "right",
  },
}));

function Home() {
  const classes = useStyles();
  const [timeNow, setTimeNow] = React.useState("");
  const [dateNow, setDateNow] = React.useState("");

  useEffect(() => {
    let myVar = setInterval(myTimer, 1000);

    return () => {
      clearInterval(myVar);
    };
  }, []);

  const myTimer = (event) => {
    let hoursNow = new Date().getHours();
    let hoursNowZ = hoursNow <= 9 ? `0` + hoursNow : hoursNow;
    let minutesNow = new Date().getMinutes();
    let minutesNowZ = minutesNow <= 9 ? `0` + minutesNow : minutesNow;
    let secondsNow = new Date().getSeconds();
    let secondsNowZ = secondsNow <= 9 ? `0` + secondsNow : secondsNow;
    let fullTimeNow = `${hoursNowZ}:${minutesNowZ}:${secondsNowZ}`;
    setTimeNow(fullTimeNow);

    let createdAtFullyear = new Date().getFullYear();
    let createdAtMonth = new Date().getMonth() + 1;
    let createdAtMonthZ =
      createdAtMonth <= 9 ? `0` + createdAtMonth : createdAtMonth;
    let createdAtDay = new Date().getDate();
    let createdAtDayZ = createdAtDay <= 9 ? `0` + createdAtDay : createdAtDay;
    let fullDateCreated = `${createdAtDayZ}/${createdAtMonthZ}/${createdAtFullyear}`;
    setDateNow(fullDateCreated);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid container justify="flex-end" item xs={12}>
          <Badge className={classes.gridDate} variant="secondary">
            <BadgeMaterial variant="dot">
              <AccessTimeIcon />
            </BadgeMaterial>
            <BadgeMaterial variant="dot">
              <Typography>{timeNow === "" ? "Memuat.." : timeNow}</Typography>
            </BadgeMaterial>
          </Badge>
          <Badge className={classes.gridDate} variant="secondary">
            <BadgeMaterial variant="dot">
              <TodayIcon />
            </BadgeMaterial>
            <BadgeMaterial variant="dot">
              <Typography>{dateNow === "" ? "Memuat.." : dateNow}</Typography>
            </BadgeMaterial>
          </Badge>
        </Grid>
        <Grid item xs={12}>
          <Carousel className={classes.gridMargin}>
            <Carousel.Item>
              <img
                src={ImageOne}
                className="d-block w-100"
                alt="First slide"
                height="550"
              />
              <Carousel.Caption>
                <p>
                  <h3>First slide label</h3>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ImageTwo}
                alt="Second slide"
                height="550"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ImageThree}
                alt="Third slide"
                height="550"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Grid>
        <Grid container justify="center" spacing={0}>
          <div
            style={{
              flexFlow: "column nowrap",
              marginTop: 40,
              marginBottom: 60,
            }}
          >
            <Grid item xs={12}>
              <Typography className={classes.boldTypographyH4} variant="h3">
                SMK Negeri 1 Nawangan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h4"
              >
                Leading Go Green School
              </Typography>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.gridMargin}>
            <img
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              src={ImageTutOne}
              alt="First slide"
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.gridMargin}>
            <img
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              src={ImageAdOne}
              alt="First slide"
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.gridMargin}>
            <img
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              src={ImageAdTwo}
              alt="First slide"
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.gridMargin}>
            <img
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              src={ImageAdThree}
              alt="First slide"
            />
          </div>
        </Grid>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={6} sm={3}>
            <div className={classes.gridMargin}>
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={ImageAdSix}
                alt="First slide"
              />
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div className={classes.gridMargin}>
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={ImageAdFive}
                alt="First slide"
              />
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div className={classes.gridMargin}>
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={ImageAdFour}
                alt="First slide"
              />
            </div>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={0}>
          <div
            style={{
              marginTop: 80,
              marginBottom: 10,
            }}
          >
            <Grid item xs={12}>
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h4"
              >
                Visi & Misi
              </Typography>
              <Badge className={classes.gridDate} variant="secondary">
                <BadgeMaterial variant="dot">
                  <EcoIcon />
                </BadgeMaterial>
                <BadgeMaterial variant="dot">
                  <Typography>Eco Green School</Typography>
                </BadgeMaterial>
              </Badge>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.gridMargin}>
            <img
              className={classes.svgGoals}
              src={SvgGoals}
              alt="First slide"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div
            style={{ textAlign: "left", padding: 10 }}
            className={classes.gridMargin}
          >
            <Typography style={{ fontWeight: "bold" }} variant="h6">
              Visi
            </Typography>
            <Typography>
              Inilah sekolah menengah di Kabupaten Pacitan yang 21 Desember 2017
              lalu menerima penghargaan Adiwiyata Tingkat Nasional. Sekolah ini
              sebelumnya maju ke Adiwiyata Tingkat Kabupaten di tahun 2015.
              Tahun berikutnya, penghargaan Adiwiyata Tingkat Provinsi pun
              diraih.
            </Typography>
            <Typography
              style={{ fontWeight: "bold", marginTop: 10 }}
              variant="h6"
            >
              Misi
            </Typography>
            <Typography>
              Inilah sekolah menengah di Kabupaten Pacitan yang 21 Desember 2017
              lalu menerima penghargaan Adiwiyata Tingkat Nasional. Sekolah ini
              sebelumnya maju ke Adiwiyata Tingkat Kabupaten di tahun 2015.
              Tahun berikutnya, penghargaan Adiwiyata Tingkat Provinsi pun
              diraih.
            </Typography>
          </div>
        </Grid>
        <Grid container justify="center" spacing={0}>
          <div
            style={{
              marginTop: 80,
              marginBottom: 10,
            }}
          >
            <Grid item xs={12}>
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h4"
              >
                Jurusan
              </Typography>
              <Badge className={classes.gridDate} variant="secondary">
                <BadgeMaterial variant="dot">
                  <EcoIcon />
                </BadgeMaterial>
                <BadgeMaterial variant="dot">
                  <Typography>Eco Green School</Typography>
                </BadgeMaterial>
              </Badge>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box p={2}>
            <div
              style={{
                padding: "5px",
                border: "1px solid",
                borderRadius: "10px",
              }}
              className={classes.gridMargin}
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={SvgAkuntansi}
                alt="First slide"
              />
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h5"
              >
                Akuntansi
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box p={2}>
            <div
              style={{
                padding: "5px",
                border: "1px solid",
                borderRadius: "10px",
              }}
              className={classes.gridMargin}
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={SvgAkuntansi}
                alt="First slide"
              />
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h5"
              >
                Tata Busana
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box p={2}>
            <div
              style={{
                padding: "5px",
                border: "1px solid",
                borderRadius: "10px",
              }}
              className={classes.gridMargin}
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                src={SvgOtomotif}
                alt="First slide"
              />
              <Typography
                color="textPrimary"
                className={classes.boldTypographyH5}
                variant="h5"
              >
                Otomotif
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={4}>
            <Box p={2}>
              <div
                style={{
                  padding: "5px",
                  border: "1px solid",
                  borderRadius: "10px",
                }}
                className={classes.gridMargin}
              >
                <img
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                  src={SvgPertanian}
                  alt="First slide"
                />
                <Typography
                  color="textPrimary"
                  className={classes.boldTypographyH5}
                  variant="h5"
                >
                  Pertanian
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box p={2}>
              <div
                style={{
                  padding: "5px",
                  border: "1px solid",
                  borderRadius: "10px",
                }}
                className={classes.gridMargin}
              >
                <img
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                  src={SvgKriaKayu}
                  alt="First slide"
                />
                <Typography
                  color="textPrimary"
                  className={classes.boldTypographyH5}
                  variant="h5"
                >
                  Kria Kayu
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
