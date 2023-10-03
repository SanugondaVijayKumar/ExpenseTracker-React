import React, { useState } from "react";
import AddExpenseForm from "../../components/expenses/AddExpenseForm";
import ShowExpenses from "../../components/expenses/ShowExpenses";

const DUMMY_EXPENSES = [
  { id: "1", amount: "200", description: "chapathi", category: "food" },
  { id: "2", amount: "7000", description: "room rent", category: "rent" },
];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, newExpense];
    });
  };
  return (
    <>
      <AddExpenseForm onAddExpense={addExpense}></AddExpenseForm>
      <ShowExpenses expenses={expenses}></ShowExpenses>
    </>
  );
};

export default Expenses;
