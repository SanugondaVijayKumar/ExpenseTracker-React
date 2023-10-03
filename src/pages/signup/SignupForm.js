import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CardBound from "../../components/UI/CardBound";

import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const history = useHistory();
  const [content, setContent] = useState(""); // Use useState to manage content
  const [showContent, setShowContent] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordRef.current.value;
      const obj = {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      };
      if (enteredPassword !== enteredConfirmPassword) {
        setContent("Passwords do not match!"); // Update the content state
        setShowContent(true);
      } else {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4`,
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok && response.status === 400) {
          throw new Error("Email Already Exists");
        }
        const data = await response.json();

        setShowContent(false);
        alert("successfully created the user!");
        history.replace("/login");
      }
    } catch (err) {
      console.log(err);
      setShowContent(false);
      alert(err.message);
    }
  };

  return (
    <>
      <Form className={classes["form-container"]} onSubmit={submitHandler}>
        <h4 className={classes["form-header"]}>Sign Up page</h4>
        <Form.Group className={classes["form-froup"]}>
          <Form.Control
            required
            type="email"
            placeholder="email"
            ref={emailInputRef}
          />
        </Form.Group>
        <Form.Group className={classes["form-froup"]}>
          <Form.Control
            required
            type="password"
            placeholder="password"
            ref={passwordInputRef}
          />
        </Form.Group>
        <Form.Group className={classes["form-froup"]}>
          <Form.Control
            required
            type="password"
            placeholder="confirm password"
            ref={confirmPasswordRef}
          />
        </Form.Group>
        {showContent && <p className={classes["error-message"]}>{content}</p>}

        <Button type="submit" className={classes["submit-button"]}>
          Sign Up
        </Button>
        <p className={classes["login-link"]}>
          Already have an Account?<Link to="/login">Login</Link>
        </p>
      </Form>
    </>
  );
};

export default SignupForm;
