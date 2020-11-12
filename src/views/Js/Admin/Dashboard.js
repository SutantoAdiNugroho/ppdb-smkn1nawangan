import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

import CanvasJSReact from '../../../assets/chartjs/canvasjs.react';
import Loader from '../../../components/Loading/Loader';
import Swal from "sweetalert2"

import { showLoader, hideLoader, getUser } from '../../../actions/application';
import { axiosReportsUsers } from "../../../modules/helpers"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootCard: {
      minWidth: 275,
  },
  paper: {
    marginTop: 10,
    padding: theme.spacing(1),
  },
  pos: {
    marginBottom: 12,
    marginTop: 5,
  },
  chartPart: {
      marginTop: 20,
  },
}));

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard(props) {
  const classes = useStyles();
  const [dateObj, setDateObj] = React.useState([]);
  const [dataDash, setDataDash] = React.useState();

    useEffect(() => {        
        formatDate();
        props.dispatch(showLoader())

        axiosReportsUsers()
        .get(`ppdb/count/dash`)
        .then( res => {
            props.dispatch(hideLoader())
            console.log(res.data)
            setDataDash(res.data)
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal mengambil data, silahkan coba kembali'
          })
        })

    }, [])
    
  const formatDate = () => {
        var dateWith29 = new Date();

        function incrementDate(dateInput,increment) {
            var dateFormatTotime = new Date(dateInput);
            var increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
            var d = new Date(increasedDate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            var dateNow = [year, month, day].join('-')
            return dateNow;
        }

        setDateObj({
            decreaseToday: incrementDate(dateWith29, 0),
            decreaseOneDay: incrementDate(dateWith29, -1),
            decreaseTwoDay: incrementDate(dateWith29, -2),
            decreaseThreeDay: incrementDate(dateWith29, -3),
            decreaseFourDay: incrementDate(dateWith29, -4),
            decreaseFiveDay: incrementDate(dateWith29, -5),
            decreaseSixDay: incrementDate(dateWith29, -6),
            decreaseSevenDay: incrementDate(dateWith29, -7),
            decreaseEightDay: incrementDate(dateWith29, -8),
            decreaseNineDay: incrementDate(dateWith29, -9)
        });
    }

    const optionsSuccessFail = {
        animationEnabled: true,
        exportFileName: "Rekap Sukses Dan Gagal",
        exportEnabled: true,
        title: {
            text: "Rekap Sukses Dan Gagal"
        },
        data: [{				
                type: "column",
                dataPoints: [
                    { label: "Verifikasi Sukses",  y: 10  },
                    { label: "Verifikasi Gagal", y: 15  },
                ]
        }]
    }

    const optionsTotal = {
        animationEnabled: true,
        exportFileName: "Persentase Pendafaftar",
        exportEnabled: true,
        title:{
            text: "Persentase Pendaftar"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: 52.94, label: "Verifikasi Sukses" },
                { y: 17.65, label: "Verifikasi Gagal" },
                { y: 29.41, label: "Belum Terverifikasi" },
            ]
        }]
    }

    const optionsPerDay = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Jumlah Pendaftar 10 Hari Terakhir"
        },
        data: [
                {
                    type: "area",
                    xValueFormatString: "DD MMM YYYY",
                    yValueFormatString: "#,##0.## Pendaftar",
                    dataPoints: [
                        { x: new Date(dateObj.decreaseToday), y: 7},
                        { x: new Date(dateObj.decreaseOneDay), y: 8},
                        { x: new Date(dateObj.decreaseTwoDay), y: 6},
                        { x: new Date(dateObj.decreaseThreeDay), y: 5},
                        { x: new Date(dateObj.decreaseFourDay), y: 4},
                        { x: new Date(dateObj.decreaseFiveDay), y: 3},
                        { x: new Date(dateObj.decreaseSixDay), y: 3},
                        { x: new Date(dateObj.decreaseSevenDay), y: 3},
                        { x: new Date(dateObj.decreaseEightDay), y: 3},
                        { x: new Date(dateObj.decreaseNineDay), y: 3},
                    ]
                }
        ]
    }

    console.log(dataDash)

  return (
      <div>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                <div className={classes.paper}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Total Pendaftar
                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.pos} color="textSecondary">
                                270
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Visit</Button>
                        </CardActions>
                    </Card>
                </div>
                </Grid>
                <Grid item xs>
                    <div className={classes.paper}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Belum Terverifikasi
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.pos} color="textSecondary">
                                    70
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Visit</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs>
                    <div className={classes.paper}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Verifikasi Sukses
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.pos} color="textSecondary">
                                    70
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Visit</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs>
                    <div className={classes.paper}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Verifikasi Gagal
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.pos} color="textSecondary">
                                    70
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Visit</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
        <div className={classes.chartPart}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <CanvasJSChart options = {optionsSuccessFail}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CanvasJSChart options = {optionsTotal}/>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className={classes.chartPart}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CanvasJSChart options = {optionsPerDay}/>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Loader />
    </div>
  );
}

const mapStateToProps = state =>({ users: state.users})

export default connect(mapStateToProps)(Dashboard)