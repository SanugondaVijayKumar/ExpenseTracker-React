import React from "react";

const ExpenseItem = (props) => {
  return (
    <div>
      {props.amount}-{props.description}-{props.category}
    </div>
  );
};

export default ExpenseItem;
