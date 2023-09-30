import React from "react";
import SignupForm from "./pages/signup/SignupForm";

import { Switch } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <SignupForm></SignupForm>
      </Route>
      <Route path="/login">
        <LoginForm></LoginForm>
      </Route>
    </Switch>
  );
}

export default App;
