import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddExpenseForm = (props) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Add category state

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        id: Math.random().toString(),
        amount,
        description,
        category,
      };

      const emailId = localStorage.getItem("email");
      const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
      const response = await axios.post(
        `https://expense-tracker-app-977c0-default-rtdb.firebaseio.com/expenses/${userid}.json`,
        {
          obj,
        }
      );
      const data = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h4>Add Expense</h4>
      <Form.Group>
        <Form.Control
          required
          type="number"
          placeholder="amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          required
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="success">
            {category ? category : "Category"} {/* Display selected category */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleCategorySelect("Food")}>
              Food
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect("Shopping")}>
              Shopping
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect("Rent")}>
              Rent
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect("Vehicle")}>
              Vehicle
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect("Other")}>
              Other
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Button type="submit">Add Expense</Button>
    </Form>
  );
};

export default AddExpenseForm;
