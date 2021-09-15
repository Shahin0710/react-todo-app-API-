import React, { useState } from "react";
import "../App.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import axios from 'axios';
//import { useHistory } from "react-router-dom";

export default function AddTodo({dialogOpen, setDialogOpen})  {


  // let history = useHistory();


  const [user, setUser] = useState({
    Title: ""
  });

  const handleClose = () => {
    setDialogOpen(false)
  };

  const { Title, errors } = user;
  const onInputChange = e => {
     setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    //Title ? (...user, {setUser}) : alert("You cannot add empty value")
    await axios.post("https://todo-app37.herokuapp.com/addTodo", user)
    .then(result => {
      alert("Success Add Todo")
      setDialogOpen(false)
    })
    .catch(error => {
      alert("Please Full Fill")
    } )
  };



  return (
   <div className="todoApp">
     <div className="w-75 mx-auto shadow p-5">
      <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>
         <h2 className="todoAppTitle">Add Todo</h2>
          </DialogTitle>
           <DialogContent dividers>
           <DialogContentText>
           <form onSubmit={e => onSubmit(e)}>
          <div className="todoForm">
            {/* <input
              type="text"
              className="todoInput"
              placeholder="Enter Your ID"
              name="_id"
              value={_id}
              onChange={e => onInputChange(e)}
            /> */}
          </div>
          <div className="todoForm">
            <input
              type="text"
              className="addTodoInput"
              placeholder="Enter Your Name"
              name="Title"
              value={Title}
              onChange={e => onInputChange(e)}
            />
          </div>
            <div className="todoBtn">
              <Button color="primary" onClick={onSubmit}>Add</Button>
              <Button color="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
        </form>
           </DialogContentText>
           </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

