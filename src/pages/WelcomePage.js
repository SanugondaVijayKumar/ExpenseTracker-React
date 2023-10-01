import React from "react";
import { Link } from "react-router-dom";

import classes from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  return (
    <div>
      Welcome to Expense Tracker!!!
      <p className={classes.link}>
        Your Profile is incomplete.
        <Link to="/update-profile">Complete now</Link>
      </p>
    </div>
  );
};

export default WelcomePage;
