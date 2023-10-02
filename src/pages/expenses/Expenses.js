import React from "react";
import AddExpenseForm from "../../components/expenses/AddExpenseForm";
import ShowExpenses from "../../components/expenses/ShowExpenses";

const Expenses = () => {
  return (
    <>
      <AddExpenseForm></AddExpenseForm>
      <ShowExpenses></ShowExpenses>
    </>
  );
};

export default Expenses;
