// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import classes from "./WelcomePage.module.css";
// import { Button } from "react-bootstrap";

// const WelcomePage = (props) => {
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [error, setError] = useState(null);

//   const sendVerificationEmail = async () => {
//     try {
//       const idToken = localStorage.getItem("token");
//       const response = await fetch(
//         `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             requestType: "VERIFY_EMAIL",
//             idToken: idToken,
//           }),
//         }
//       );
//       if (response.ok) {
//         setIsEmailSent(true);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while sending the verification email.");
//       alert(error);
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <Button className={classes.logout}>Logout</Button>
//       </div>
//       Welcome to Expense Tracker!!!
//       <p className={classes.link}>
//         Your Profile is incomplete.
//         <Link to="/update-profile">Complete now</Link>
//       </p>
//       <div className={classes.centerButton}>
//         <Button onClick={sendVerificationEmail}>verify your email</Button>
//         {isEmailSent && (
//           <div>
//             A verification email has been sent. Check your email, you might have
//             received a verification link. Click on it to verify.
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default WelcomePage;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import classes from "./WelcomePage.module.css";
import { Button } from "react-bootstrap";

const WelcomePage = (props) => {
  const history = useHistory();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const sendVerificationEmail = async () => {
    try {
      const idToken = localStorage.getItem("token");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );
      if (!response.ok) {
        // setIsEmailSent(true);
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      alert("verified...");
    } catch (err) {
      console.error(err);
      setError("An error occurred while sending the verification email.");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  return (
    <div className={classes.container}>
      <Button className={classes.logout} onClick={logoutHandler}>
        Logout
      </Button>
      <h1>Welcome to Expense Tracker!!!</h1>
      <p className={classes.link}>
        Your Profile is incomplete.
        <Link to="/update-profile">Complete now</Link>
      </p>
      <div className={classes.centerButton}>
        <Button onClick={sendVerificationEmail}>Verify your email</Button>
        {isEmailSent && (
          <div className={classes.message}>
            A verification email has been sent. Check your email, you might have
            received a verification link. Click on it to verify.
          </div>
        )}
        {error && <p className={classes.error}>{error}</p>}
      </div>
    </div>
  );
};

export default WelcomePage;
