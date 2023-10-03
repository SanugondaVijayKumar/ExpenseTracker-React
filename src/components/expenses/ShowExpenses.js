import React, { useState, useEffect, useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import axios from "axios";
import ItemContext from "../store/item-context";

const ShowExpenses = (props) => {
  const itemCtx = useContext(ItemContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const emailId = localStorage.getItem("email");
    const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");

    async function fetchExpenses() {
      try {
        const response = await axios.get(
          `https://expense-tracker-app-977c0-default-rtdb.firebaseio.com/expenses/${userid}.json`
        );
        // if (response.status !== 200) {
        //   throw new Error(response.statusText);
        // }
        let data = response.data;
        if (!data) {
          data = [];
        } else {
          data = Object.values(data);
        }

        setExpenses(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchExpenses();
  }, [itemCtx]);

  const filteredExpenses = expenses.map((expense) => {
    return (
      <ExpenseItem
        key={expense.obj.id}
        id={expense.obj.id}
        amount={expense.obj.amount}
        description={expense.obj.description}
        category={expense.obj.category}
        onEdit={props.onEdit}
      ></ExpenseItem>
    );
  });
  return <>{filteredExpenses}</>;
};

export default ShowExpenses;
