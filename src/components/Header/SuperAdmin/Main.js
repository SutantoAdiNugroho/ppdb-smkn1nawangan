import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import AccountProfileIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { verify } from "../../../modules/helpers"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fullList: {
    width: 'auto',
  },
  bold: {
    fontWeight: 'bold'
  }
}));

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [data, setData] = React.useState("")
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };


  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemText>Welcome, {verify().fullName}</ListItemText>
        </ListItem>

        {['Pendaftar PPDB 2020'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/regist-table"
          >
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}

        {['Tambah Admin Baru'].map((text, index) => (
          <ListItem 
          button 
          key={text}
          component={Link}
          to="/add-admin"
          >
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary={text} ></ListItemText>
          </ListItem>
        ))}
          
      </List>
    </div>
  );

  return (
    <div>
      <IconButton 
      onClick={toggleDrawer('left', true)}
      id="Menu-User" edge="start" 
      className={classes.menuButton} 
      color="inherit" 
      aria-label="menu">
        <MenuIcon />
      </IconButton>      
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}