import React from 'react';
import { Link,withRouter } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { verify, axiosReportsUsers } from "./helpers"
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

class ListProblem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
      filterProblem: "",
    };
  }

  showAllRegistrant = () => {    
    axiosReportsUsers()
      .get(`ppdb`)
      .then(response => {                
        this.setState({ data: response.data.data })
        console.log(this.state.data.length)
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.showAllRegistrant();        
  }

  handleChangeSearchRegistrant = event => {
    axiosReportsUsers()
    .get(`ppdb/search-fullname/?q=${event.target.value}`).then(result=>{
      console.log(result);
      
      this.setState({data : result.data.data})
      
    }).catch(error=>{
      console.log(error);
      
    })
  };

  
  render () {
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14          
        },
      }))(TableCell);

      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
        },
      }))(TableRow);      

    return (
      <div style={{padding:"5px"}}>
        <div>
          <TextField
              variant="outlined"
              margin="normal"            
              id="fullName"
              label="Cari dengan nama.."
              name="fullName"
              autoComplete="fullName"
              onChange={this.handleChangeSearchRegistrant}                      
              style={{position:"absolute", left:"5px", top:"70px"}}
            />
            <div>
            <Badge color="secondary" badgeContent={`Jumlah Pendaftar`} showZero></Badge>
            </div>
            <Button variant="contained" size="small" color="primary" style={{position:"absolute", right:"5px", top:"110px"}} onClick={() =>this.showAllRegistrant()}>
                Refresh
            </Button>
          </div>
        <TableContainer style={{marginTop:"90px"}}>        
            <Table style={{minWidth:700}} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>ID Pendaftar</StyledTableCell>
                    <StyledTableCell align="right">Nama Lengkap</StyledTableCell>
                    <StyledTableCell align="right">NISN</StyledTableCell>                            
                    <StyledTableCell align="right">Jurusan Utama</StyledTableCell>            
                    <StyledTableCell align="right">Asal Sekolah</StyledTableCell>                                        
                    <StyledTableCell align="right">Aksi</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.data.map((row) => (
                    <StyledTableRow key={row.idRegister}>
                    <StyledTableCell component="th" scope="row">
                        {row.idRegister}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fullName}</StyledTableCell>
                    <StyledTableCell align="right">{row.nisn}</StyledTableCell>
                    <StyledTableCell align="right">{row.facultyFirst}</StyledTableCell>
                    <StyledTableCell align="right">{row.fromSchool}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" size="small" color="primary" component={Link} to={`regist-card/${row._id}`}>
                            Detail
                        </Button>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
      </div>
    );
  }
}

export default withRouter(ListProblem)