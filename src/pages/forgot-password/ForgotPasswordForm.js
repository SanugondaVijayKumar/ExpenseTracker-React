import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import classes from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredEmail = emailInputRef.current.value;
      const obj = {
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      };
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      alert(
        "Reset Link has been sent to your mail id,kindly reset the password and login again"
      );
      history.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className={classes.formContainer} onSubmit={submitHandler}>
      <Form.Control
        required
        type="email"
        placeholder="email"
        ref={emailInputRef}
        className={classes.formControl}
      />

      <Button type="submit" className={classes.submitButton}>
        Send Reset Link
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
