import React, {useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
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

import { axiosReportsUsers } from "../../../modules/helpers"

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

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '130px'
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flexGrow: 1,
  },
});

function StickyHeadTable() {  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([])  
  const [timeNow, setTimeNow] = React.useState("")
  const [dateNow, setDateNow] = React.useState("")    

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSearchRegistrant = (event) => {    
    axiosReportsUsers()
        .get(`ppdb/search-fullname/?q=${event.target.value}`)
        .then(
          res => setData(res.data.data)
        ).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal mengambil data, silahkan coba kembali'
          })
        })        
  };  

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
        .get(`ppdb`)
        .then(
          res => setData(res.data.data)
        ).catch(error => {
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
              variant="outlined"
              margin="normal"            
              id="fullName"
              label="Cari dengan nama.."
              name="fullName"
              autoComplete="fullName"
              onChange={handleChangeSearchRegistrant}
              style={{position:"absolute", left:"5px", top:"70px"}}              
            />       
            <TextField
              style={{position:"absolute", right:"5px", top:"70px", width:"108px"}}
              variant="outlined"
              margin="normal"            
              id="fullName"
              size="small"
              value={dateNow}
              disabled
            />
            <TextField
              style={{position:"absolute", right:"5px", top:"120px", width:"108px"}}
              variant="outlined"
              margin="normal"            
              id="fullName"
              size="small"
              value={timeNow}
              disabled
            />
    </div>
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.idRegister}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id == "action" ? 
                        <div>
                            <Button variant="contained" size="small" color="secondary" style={{marginTop:"10px", marginRight:"10px"}} component={Link} to={`regist-card/${row._id}`}>
                                Detail
                            </Button>
                            <Button variant="contained" size="small" color="primary" style={{marginTop:"10px", marginRight:"10px"}} component={Link} to={`regist-verify/${row._id}`}>
                                Verifikasi
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />      
    </Paper>
    </div>
  );
}

export default withRouter(StickyHeadTable)