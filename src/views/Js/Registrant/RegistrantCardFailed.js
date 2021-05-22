import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link as LinkRouter, withRouter } from "react-router-dom";
import { axiosReportsUsers } from "../../../modules/helpers";
import Swal from "sweetalert2";
import ReactToPdf from "react-to-pdf";

const ref = React.createRef();

const useStyles = makeStyles((theme) => ({
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
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

function Checkout({ match }, props) {
  const classes = useStyles();  
  let linkBack = "/regist-failed";

  const [idRegister, setIdRegister] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [nisn, setNisn] = React.useState("");
  const [bornPlace, setBornPlace] = React.useState("");
  const [dateBorn, setDateBorn] = React.useState("");
  const [fromSchool, setFromSchool] = React.useState("");
  const [firstFaculty, setFirstFaculty] = React.useState("");
  const [secondFaculty, setSecondFaculty] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const id = match.params.id;

  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: "Silahkan tunggu..",
      timer: 9999999,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    axiosReportsUsers()
      .get(`ppdb-admin/failed/id/${id}`)
      .then((response) => {
        setFullName({ fullName: response.data.data[0].fullName });
        setIdRegister({ idRegister: response.data.data[0].idRegister });
        setNisn({ nisn: response.data.data[0].nisn });
        setBornPlace({ bornPlace: response.data.data[0].bornPlace });
        setDateBorn({ dateBorn: response.data.data[0].dateBorn });
        setFromSchool({ fromSchool: response.data.data[0].fromSchool });
        setFirstFaculty({ firstFaculty: response.data.data[0].facultyFirst });
        setSecondFaculty({
          secondFaculty: response.data.data[0].facultySecond,
        });
        setCreatedAt({ createdAt: response.data.data[0].created_at });

        Swal.fire({
          icon: "success",
          title: "Sukses mengambil data",
        });

        setIsLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data, silahkan coba kembali",
        });
      });
  }, []);

  let createdAtFullyear = new Date(createdAt.createdAt).getFullYear();
  let createdAtMonth = new Date(createdAt.createdAt).getMonth() + 1;
  let createdAtMonthZ =
    createdAtMonth <= 9 ? `0` + createdAtMonth : createdAtMonth;
  let createdAtDay = new Date(createdAt.createdAt).getDate();
  let createdAtDayZ = createdAtDay <= 9 ? `0` + createdAtDay : createdAtDay;

  let createdAtHours = new Date(createdAt.createdAt).getHours();
  createdAtHours = createdAtHours <= 9 ? `0` + createdAtHours : createdAtHours;

  let createdAtMinutes = new Date(createdAt.createdAt).getMinutes();
  createdAtMinutes =
    createdAtMinutes <= 9 ? `0` + createdAtMinutes : createdAtMinutes;

  let createdAtSecond = new Date(createdAt.createdAt).getSeconds();
  createdAtSecond =
    createdAtSecond <= 9 ? `0` + createdAtSecond : createdAtSecond;

  let fullDateCreated = `${createdAtDayZ}/${createdAtMonthZ}/${createdAtFullyear} ${createdAtHours}:${createdAtMinutes}:${createdAtSecond}`;

  if (isLoading) return <Box marginTop={70}></Box>;

  return (
    <div id="divToPrint">
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Typography variant="h5" align="center">
                SMKN 1 Example
              </Typography>
              <Typography variant="h6" align="center">
                PPDB Online 2021
              </Typography>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  ID Peserta
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {idRegister.idRegister}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  Nama Lengkap
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {fullName.fullName}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  NISN
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {nisn.nisn}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  Tempat Tanggal Lahir
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {bornPlace.bornPlace}, {dateBorn.dateBorn}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  Asal Sekolah
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {fromSchool.fromSchool}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  Pilihan Jurusan
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  1. {firstFaculty.firstFaculty}
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  2. {secondFaculty.secondFaculty}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="h6" gutterBottom>
                  Tanggal Pendaftaran
                </Typography>
                <Typography style={{ marginTop: "-10px" }} gutterBottom>
                  {fullDateCreated}
                </Typography>
              </div>
            </React.Fragment>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.submit}
                component={LinkRouter}
                to={linkBack}
                style={{ marginTop: "40px", marginLeft: "5px" }}
              >
                Kembali
              </Button>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default withRouter(Checkout);
