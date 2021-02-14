import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

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

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div className={classes.paper}>
              <Box key={1} width="100%" marginRight={0.5}>
                <Skeleton variant="rect" height={118} />
                <Box pt={0.5}>
                  <Skeleton />
                </Box>
              </Box>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.paper}>
              <Box key={2} width="100%" marginRight={0.5}>
                <Skeleton variant="rect" height={118} />
                <Box pt={0.5}>
                  <Skeleton />
                </Box>
              </Box>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.paper}>
              <Box key={3} width="100%" marginRight={0.5}>
                <Skeleton variant="rect" width="100%" height={118} />
                <Box pt={0.5}>
                  <Skeleton />
                </Box>
              </Box>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.paper}>
              <Box key={4} width="100%" marginRight={0.5}>
                <Skeleton variant="rect" width="100%" height={118} />
                <Box pt={0.5}>
                  <Skeleton />
                </Box>
              </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube() {
  return (
    <Box overflow="hidden">
      <Media loading />
    </Box>
  );
}