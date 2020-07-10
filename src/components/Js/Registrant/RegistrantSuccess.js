import React, {useEffect} from 'react';
import { axiosReportsUsers } from "../helpers"
import { Link,withRouter } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Swal from "sweetalert2"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';

//icons
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import EcoIcon from '@material-ui/icons/Eco';
import SpaIcon from '@material-ui/icons/Spa';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

const columns = [
  { id: 'idRegister', label: 'ID Register', minWidth: 170 },
  { id: 'fullName', label: 'Nama Lengkap', minWidth: 100 },
  {
    id: 'nisn',
    label: 'NISN',
    minWidth: 170,  
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fromSchool',
    label: 'Asal Sekolah',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'facultyFirst',
    label: 'Jurusan Utama',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Aksi',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',    
  },
  rootZ: {
    width: '100%',
    marginTop: '100px'
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flexGrow: 1,
  },
  rootZX: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: "100px"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,    
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function StickyHeadTable() {  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);      
  const [timeNow, setTimeNow] = React.useState("")
  const [dateNow, setDateNow] = React.useState("")    
  const [value, setValue] = React.useState(0);
  const [oldValue, setOldValue] = React.useState(0);

  //registrant
  const [facultyAkl, setFacultyAkl] = React.useState([]);
  const [facultyAtph, setFacultyAtph] = React.useState([]);
  const [facultyKkkr, setFacultyKkkr] = React.useState([]);
  const [facultyTb, setFacultyTb] = React.useState([]);
  const [facultyTkro, setFacultyTkro] = React.useState([]);  

  const handleChange = (event, newValue) => {    
    setValue(newValue);
    setOldValue(newValue);
  };
  
  const handleChangeAll = (event) => {    
    if (event.target.value !== "") {
      setValue(8);
    } else {
      setValue(oldValue);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

//   const handleChangeSearchRegistrant = (event) => {
//     axiosReportsUsers()
//         .get(`ppdb/search-fullname/?q=${event.target.value}`)
//         .then(
//           res => setData(res.data.data)
//         ).catch(error => {
//           Swal.fire({
//             icon: 'error',
//             title: 'Gagal mengambil data, silahkan coba kembali'
//           })
//         })        
//   };  

  const myTimer = (event) => {
    let hoursNow = new Date().getHours()
    let hoursNowZ = (hoursNow <= 9 ? `0`+hoursNow : hoursNow)
    let minutesNow = new Date().getMinutes()
    let minutesNowZ = (minutesNow <= 9 ? `0`+minutesNow : minutesNow)
    let secondsNow = new Date().getSeconds()    
    let secondsNowZ = (secondsNow <= 9 ? `0`+secondsNow : secondsNow)
    let fullTimeNow = `${hoursNowZ}:${minutesNowZ}:${secondsNowZ}` 
    setTimeNow(fullTimeNow) 

    let createdAtFullyear = new Date().getFullYear()
    let createdAtMonth = new Date().getMonth()+1
    let createdAtMonthZ = (createdAtMonth <= 9 ? `0`+createdAtMonth : createdAtMonth)
    let createdAtDay = new Date().getDate()
    let createdAtDayZ = (createdAtDay <= 9 ? `0`+createdAtDay : createdAtDay)
    let fullDateCreated = `${createdAtDayZ}/${createdAtMonthZ}/${createdAtFullyear}` 
    setDateNow(fullDateCreated)
  }    

  useEffect(() => {        

    let myVar = setInterval(myTimer, 1000);  

      axiosReportsUsers()
        .get(`verify/verified/getall`)
        .then(res => {
            
            setFacultyAtph(res.data.facultyAtph)
            setFacultyTb(res.data.facultyTb)
            setFacultyTkro(res.data.facultyTkro)
            setFacultyKkkr(res.data.facultyKkkr)
            setFacultyAkl(res.data.facultyAkl)            

        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal mengambil data, silahkan coba kembali'
          })
        })                
        
      return () => {
        clearInterval(myVar)
      }
  }, [])
          
  return (
    <div>          
     <div style={{marginBottom:"100px"}}>          
            <TextField
              style={{position:"absolute", right:"5px", top:"80px", width:"108px"}}
              variant="outlined"
              margin="normal"            
              id="fullName"
              size="small"
              value={dateNow}
              disabled
            />
            <TextField
              style={{position:"absolute", right:"120px", top:"80px", width:"108px"}}
              variant="outlined"
              margin="normal"            
              id="fullName"
              size="small"
              value={timeNow}
              disabled
            />
    </div>

    <div className={classes.rootZX}>
      <AppBar position="relative" color="default">
        <Grid container spacing={0}>      
          <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  margin="normal"
                  id="searchAll"                  
                  name="searchAll"
                  autoComplete="searchAll"
                  onChange={handleChangeAll}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}          
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"          
            >
              <Tab label="Akuntansi (AKL)" icon={<EuroSymbolIcon />} {...a11yProps(0)} />
              <Tab label="Tata Busana (TB)" icon={<AccessibilityNewIcon />} {...a11yProps(1)} />
              <Tab label="Otomotif (TKRO)" icon={<MotorcycleIcon />} {...a11yProps(2)} />
              <Tab label="Pertanian (ATPH)" icon={<EcoIcon />} {...a11yProps(3)} />
              <Tab label="Kria Kayu (KKKR)" icon={<SpaIcon />} {...a11yProps(4)} />
            </Tabs>
          </Grid>             
      </AppBar>      
      <TabPanel value={value} index={0}>
        <TextField
            variant="outlined"
            margin="normal"            
            id="fullName"
            label="Cari dengan nama.."
            name="fullName"
            autoComplete="fullName"
        //   onChange={handleChangeSearchRegistrant}            
        />

        <Paper className={classes.root}>           
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facultyAkl.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id == "action" ? 
                                <div>
                                    <Button variant="contained" size="small" color="secondary"  component={Link} to={`regist-card/${row._id}`}>
                                        Detail
                                    </Button>                        
                                </div>
                                :
                                column.format && typeof value === 'number' ? column.format(value) : value}                        
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={facultyAkl.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />      
        </Paper>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextField
            variant="outlined"
            margin="normal"            
            id="fullName"
            label="Cari dengan nama.."
            name="fullName"
            autoComplete="fullName"
        //   onChange={handleChangeSearchRegistrant}            
        />

        <Paper className={classes.root}>           
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facultyTb.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id == "action" ? 
                                <div>
                                    <Button variant="contained" size="small" color="secondary"  component={Link} to={`regist-card/${row._id}`}>
                                        Detail
                                    </Button>                        
                                </div>
                                :
                                column.format && typeof value === 'number' ? column.format(value) : value}                        
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={facultyTb.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />      
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TextField
            variant="outlined"
            margin="normal"            
            id="fullName"
            label="Cari dengan nama.."
            name="fullName"
            autoComplete="fullName"
        //   onChange={handleChangeSearchRegistrant}            
        />

        <Paper className={classes.root}>           
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facultyTkro.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id == "action" ? 
                                <div>
                                    <Button variant="contained" size="small" color="secondary"  component={Link} to={`regist-card/${row._id}`}>
                                        Detail
                                    </Button>                        
                                </div>
                                :
                                column.format && typeof value === 'number' ? column.format(value) : value}                        
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={facultyTkro.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />      
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TextField
            variant="outlined"
            margin="normal"            
            id="fullName"
            label="Cari dengan nama.."
            name="fullName"
            autoComplete="fullName"
        //   onChange={handleChangeSearchRegistrant}            
        />

        <Paper className={classes.root}>           
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facultyAtph.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id == "action" ? 
                                <div>
                                    <Button variant="contained" size="small" color="secondary"  component={Link} to={`regist-card/${row._id}`}>
                                        Detail
                                    </Button>                        
                                </div>
                                :
                                column.format && typeof value === 'number' ? column.format(value) : value}                        
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={facultyAtph.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />      
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <TextField
            variant="outlined"
            margin="normal"            
            id="fullName"
            label="Cari dengan nama.."
            name="fullName"
            autoComplete="fullName"
        //   onChange={handleChangeSearchRegistrant}            
        />

        <Paper className={classes.root}>           
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facultyKkkr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.id == "action" ? 
                                <div>
                                    <Button variant="contained" size="small" color="secondary"  component={Link} to={`regist-card/${row._id}`}>
                                        Detail
                                    </Button>                        
                                </div>
                                :
                                column.format && typeof value === 'number' ? column.format(value) : value}                        
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={facultyKkkr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />      
        </Paper>
      </TabPanel>      
    </div>    
    </div> 
  );
}

export default withRouter(StickyHeadTable)