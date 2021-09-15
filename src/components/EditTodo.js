import "../App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";


export default function EditTodo()  {

  let history = useHistory();
  const { id } = useParams();

  const [user, setUser] = useState({
    Title: ""
  });

  const { Title } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.patch(`https://todo-app37.herokuapp.com/updateTodo?id=${id}`, user);
    history.push("/");
  };

  const loadUser = async () => {
      const result = await axios.get(`https://todo-app37.herokuapp.com/singleTodo?id=${id}`);
      setUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="todoApp">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="todoAppTitle">Edit Todo</h2>
        <Button color="secondary" onClick={onSubmit}>Update Todo</Button>

        <form onSubmit={e => onSubmit(e)}>
          {/* <div className="todoForm">
            <input
              type="text"
              className="todoInput"
              placeholder="Enter Your ID"
              name="_id"
              value={_id}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <div className="todoForm">
            <input
              type="text"
              className="todoInput"
              placeholder="Enter Your Name"
              name="Title"
              value={Title}
              onChange={e => onInputChange(e)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

  
