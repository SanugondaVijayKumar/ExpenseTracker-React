import React from "react";
import ExpenseItem from "./ExpenseItem";

const ShowExpenses = (props) => {
  const DUMMY_EXPENSES = [
    { id: "1", amount: "200", description: "chapathi", category: "food" },
    { id: "2", amount: "7000", description: "room rent", category: "rent" },
  ];
  const expenses = DUMMY_EXPENSES.map((expense) => {
    return (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        amount={expense.amount}
        description={expense.description}
        category={expense.category}
      ></ExpenseItem>
    );
  });
  return <>{expenses}</>;
};

export default ShowExpenses;
