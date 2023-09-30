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
        console.log("entered if");
        setContent("Passwords do not match!"); // Update the content state
        setShowContent(true);
        console.log("showContent=", showContent);
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
        console.log("response=", response);
        if (!response.ok && response.status === 400) {
          throw new Error("Email Already Exists");
        }
        const data = await response.json();
        console.log(data);
        setShowContent(false);
        history.replace("/login");
      }
    } catch (err) {
      console.log(err);
      setShowContent(false);
      alert(err.message);
    }
  };

  return (
    <div className={classes.CardContainer}>
      <CardBound>
        <Form onSubmit={submitHandler}>
          <h4>Sign Up page</h4>
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
          <Form.Group className={classes["Form-Group"]}>
            <Form.Control
              required
              type="password"
              placeholder="confirm password"
              className={classes["Form-Control"]}
              ref={confirmPasswordRef}
            />
          </Form.Group>
          {showContent && <p className={classes.red}>{content}</p>}

          <Button type="submit">Sign Up</Button>
          <p>
            Already have an Account?<Link to="/login">Login</Link>
          </p>
        </Form>
      </CardBound>
    </div>
  );
};

export default SignupForm;