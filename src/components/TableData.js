import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


export default function TableData() {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
      const result = await axios.get("https://todo-app37.herokuapp.com/loadTodo");
      setUsers(result.data.reverse());
  }

  const deleteTodo = async id => {
    await axios.delete(`https://todo-app37.herokuapp.com/deleteTodo?id=${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <TableContainer className="pageTitle" component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
        users.map((user, index) => (
          
          <TableRow>
          <TableCell component="th" scope="row">
            {index + 101}
          </TableCell>
          <TableCell align="center">{user.Title}</TableCell>
          <TableCell align="center">
          <Link to={`/view/${user._id}`}>
          <Button className="action">
          <VisibilityIcon />
          </Button>
          </Link>
          <Link to={`/edit/${user._id}`}>
          <Button className="action">
          <EditIcon />  
          </Button>
          </Link>
          <Button className="action" color="secondary" onClick={() => deleteTodo(user._id)}>
            <DeleteIcon />
          </Button>
          </TableCell>
          </TableRow>
          
            ))
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

