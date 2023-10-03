import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import ItemContext from "../store/item-context";

const ExpenseItem = (props) => {
  const itemCtx = useContext(ItemContext);

  const id = props.id;
  const editHandler = async () => {
    let nameValue;
    const emailId = localStorage.getItem("email");
    const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
    try {
      const response = await axios.get(
        `https://expense-tracker-app-977c0-default-rtdb.firebaseio.com/expenses/${userid}.json`
      );
      let data = response.data;
      //   console.log("data=", data);
      for (let name in data) {
        // console.log("data[name]=", data[name]);
        if (data[name].obj.id === id) {
          nameValue = name;
          console.log("nameValue=", nameValue);
          break;
        }
      }
      props.onEdit(nameValue);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    let nameValue;
    const emailId = localStorage.getItem("email");
    const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
    try {
      const response = await axios.get(
        `https://expense-tracker-app-977c0-default-rtdb.firebaseio.com/expenses/${userid}.json`
      );
      let data = response.data;
      //   console.log("data=", data);
      for (let name in data) {
        // console.log("data[name]=", data[name]);
        if (data[name].obj.id === id) {
          nameValue = name;
          //   console.log("nameValue=", nameValue);
          break;
        }
      }
      const deleteResponse = await axios.delete(
        `https://expense-tracker-app-977c0-default-rtdb.firebaseio.com/expenses/${userid}/${nameValue}.json`
      );
      itemCtx.changeItem();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {props.amount}-{props.description}-{props.category}
      <Button variant="success" onClick={editHandler}>
        Edit
      </Button>
      <Button variant="danger" onClick={deleteHandler}>
        Delete
      </Button>
    </div>
  );
};

export default ExpenseItem;
