import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as LinkRouter,withRouter } from 'react-router-dom'
import axios from "axios"
import Swal from "sweetalert2"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {isMobile} from 'react-device-detect';

const printDocument = () => {
  if (isMobile) {
    const input = document.getElementById('divIdToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");
      })
    ;
  } else {
    document.getElementById('divToPrint').style.backgroundColor = "white"
    document.getElementById('divToPrint').style.height = "850px"
    
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', -25, -25);      
        pdf.save("download.pdf");
      })
    ; 
  }    
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Admin © '}
      <Link color="inherit">
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

function Checkout({match}) {
  const classes = useStyles();  
  const isLogin = localStorage.getItem("token");
  let linkBack = ""

  if (isLogin) {
    linkBack = "/regist-table"
  } else {
    linkBack = "/"
  }

  const [idRegister, setIdRegister] = React.useState("")
  const [fullName, setFullName] = React.useState("")  
  const [nisn, setNisn] = React.useState("")
  const [bornPlace, setBornPlace] = React.useState("")
  const [dateBorn, setDateBorn] = React.useState("")
  const [fromSchool, setFromSchool] = React.useState("")
  const [firstFaculty, setFirstFaculty] = React.useState("")
  const [secondFaculty, setSecondFaculty] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState("")

  const id = match.params.id
  let urlLoginLive = "https://ppdb-smkn1nawangan-back.herokuapp.com/";  

  useEffect(() => {
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
        .get(`${urlLoginLive}ppdb/id/${id}`)
        .then(response => {          
          setFullName({ fullName : response.data.data[0].fullName })
          setIdRegister({ idRegister : response.data.data[0].idRegister })
          setNisn({ nisn : response.data.data[0].nisn })
          setBornPlace({ bornPlace : response.data.data[0].bornPlace })
          setDateBorn({ dateBorn : response.data.data[0].dateBorn })
          setFromSchool({ fromSchool : response.data.data[0].fromSchool })
          setFirstFaculty({ firstFaculty : response.data.data[0].facultyFirst })
          setSecondFaculty({ secondFaculty : response.data.data[0].facultySecond })
          setCreatedAt({ createdAt : response.data.data[0].created_at })

          Swal.fire({
            icon: 'success',
            title: 'Sukses mengambil data'
          })
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal mengambil data, silahkan coba kembali'
          })
        })
  }, []) 

  let createdAtFullyear = new Date(createdAt.createdAt).getFullYear()
  let createdAtMonth = new Date(createdAt.createdAt).getMonth()+1
  let createdAtDay = new Date(createdAt.createdAt).getDate()
  let fullDateCreated = `${createdAtDay}/${createdAtMonth}/${createdAtFullyear}`  

  return (     
    <div id="divToPrint">       
    <React.Fragment>
      <CssBaseline />           
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <React.Fragment>          
              <Typography variant="h5" align="center">
                  SMKN 1 Nawangan
                </Typography>
                <Typography variant="h6" align="center">
                  PPDB Online 2020
                </Typography>      
                <div style={{marginTop:"20px"}}>
                  <Typography variant="h6" gutterBottom>
                      ID Peserta
                  </Typography>
                  <Typography style={{marginTop:"-10px"}} gutterBottom>
                      {idRegister.idRegister}
                  </Typography>
                </div>
                <div style={{marginTop:"10px"}}>
                  <Typography variant="h6" gutterBottom>
                      Nama Lengkap
                  </Typography>
                  <Typography style={{marginTop:"-10px"}} gutterBottom>
                      {fullName.fullName}
                  </Typography>
                </div>
                <div style={{marginTop:"10px"}}>
                  <Typography variant="h6" gutterBottom>
                      NISN
                  </Typography>
                  <Typography style={{marginTop:"-10px"}} gutterBottom>
                      {nisn.nisn}
                  </Typography>
                </div>
                <div style={{marginTop:"10px"}}>
                  <Typography variant="h6" gutterBottom>
                      Tempat Tanggal Lahir
                  </Typography>
                  <Typography style={{marginTop:"-10px"}} gutterBottom>
                      {bornPlace.bornPlace}, {dateBorn.dateBorn}
                  </Typography>
            </div>
            <div style={{marginTop:"10px"}}>
              <Typography variant="h6" gutterBottom>
                  Asal Sekolah
              </Typography>
              <Typography style={{marginTop:"-10px"}} gutterBottom>
                  {fromSchool.fromSchool}
              </Typography>
          </div>
          <div style={{marginTop:"10px"}}>
            <Typography variant="h6" gutterBottom>
                Pilihan Jurusan
            </Typography>
            <Typography style={{marginTop:"-10px"}} gutterBottom>
                1. {firstFaculty.firstFaculty}
            </Typography>
            <Typography style={{marginTop:"-10px"}} gutterBottom>
                2. {secondFaculty.secondFaculty}
            </Typography>
          </div>
          <div style={{marginTop:"10px"}}>
            <Typography variant="h6" gutterBottom>
                Tanggal Pendaftaran
            </Typography>
            <Typography style={{marginTop:"-10px"}} gutterBottom>
                {fullDateCreated}
            </Typography>
          </div>          
    </React.Fragment>                              
                <div style={{textAlign:"center"}}>                                                        
                  <Button
                    variant="contained"
                    color="primary"                    
                    className={classes.submit}                    
                    style={{marginTop:"40px", marginRight:"5px"}}   
                    onClick={printDocument} 
                    component={LinkRouter}                  
                  >
                    Download pdf
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"                    
                    className={classes.submit}
                    component={LinkRouter}
                     to={linkBack}
                    style={{marginTop:"40px", marginLeft:"5px"}}                    
                  >
                    Kembali
                  </Button>
                </div>                                  
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>    
    </div>
  );
}

export default withRouter(Checkout)