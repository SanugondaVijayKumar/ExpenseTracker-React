import React from "react";
import SignupForm from "./pages/signup/SignupForm";

import { Switch } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import WelcomePage from "./pages/WelcomePage";
import UpdateProfile from "./pages/update-profile/UpdateProfile";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <SignupForm></SignupForm>
      </Route>
      <Route path="/login">
        <LoginForm></LoginForm>
      </Route>
      <Route path="/welcome">
        <WelcomePage></WelcomePage>
      </Route>
      <Route path="/update-profile">
        <UpdateProfile></UpdateProfile>
      </Route>
    </Switch>
  );
}

export default App;
