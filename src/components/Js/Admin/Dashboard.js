import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
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
  );
}