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
    <div className={classes.CardContainer}>
      <CardBound>
        <Form onSubmit={submitHandler}>
          <h4>Login page</h4>
          <Form.Group className={classes["Form-Group"]}>
            <Form.Control
              required
              type="email"
              placeholder="email"
              className={classes["Form-Control"]}
              ref={emailInputRef}
            />
          </Form.Group>
          <Form.Group className={classes["Form-Group"]}>
            <Form.Control
              required
              type="password"
              placeholder="password"
              className={classes["Form-Control"]}
              ref={passwordInputRef}
            />
          </Form.Group>

          <Button type="submit">Login</Button>
          <p>
            Don't have an Account?<Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </CardBound>
    </div>
  );
};

export default LoginForm;
