import React, { useState } from "react";
import AddExpenseForm from "../../components/expenses/AddExpenseForm";
import ShowExpenses from "../../components/expenses/ShowExpenses";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState(null);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, newExpense];
    });
  };

  const editHandler = (nameValue) => {
    setName(nameValue);
  };

  return (
    <>
      <AddExpenseForm onAddExpense={addExpense} name={name}></AddExpenseForm>
      <ShowExpenses expenses={expenses} onEdit={editHandler}></ShowExpenses>
    </>
  );
};

export default Expenses;
