import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CardBound from "../../components/UI/CardBound";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const obj = {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      };

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();

      const token = data.idToken;
      localStorage.setItem("token", token);
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      alert("successfully loggedIn");
      history.replace("/welcome");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={submitHandler} className={classes["form-container"]}>
      <h4 className={classes["form-header"]}>Login page</h4>
      <Form.Group>
        <Form.Control
          required
          type="email"
          placeholder="email"
          ref={emailInputRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          required
          type="password"
          placeholder="password"
          ref={passwordInputRef}
        />
      </Form.Group>

      <Button className={classes["submit-button"]} type="submit">
        Login
      </Button>
      <p className={classes["sign-up-link"]}>
        Don't have an Account?<Link to="/signup">Sign Up</Link>
      </p>
    </Form>
  );
};

export default LoginForm;
