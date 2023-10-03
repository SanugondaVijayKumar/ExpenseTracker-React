import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import axios from "axios";

const ShowExpenses = (props) => {
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
        data = Object.values(data);
        console.log("data=", data);
        setExpenses(data);
        // if (!response.data) {
        //   response.data = [];
        // }
        // const data = response.data;
        // console.log("getting expenses data=", data);
        // setExpenses(Object.values[data]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.map((expense) => {
    return (
      <ExpenseItem
        key={expense.obj.id}
        id={expense.obj.id}
        amount={expense.obj.amount}
        description={expense.obj.description}
        category={expense.obj.category}
      ></ExpenseItem>
    );
  });
  return <>{filteredExpenses}</>;
};

export default ShowExpenses;
