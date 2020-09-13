import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainHome from "./HomePage";
import AdminPage from "./AdminPage";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const MainApp = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact component={MainHome} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  </Router>
);

export default MainApp;
