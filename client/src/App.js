import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import PrivateRoutes from "./components/routing/PrivateRoutes";
import Login from "./components/auth/Login";
import Home from "./components/main/Home";
import "simplebar/dist/simplebar.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./css/main.css";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Switch>
            <PrivateRoutes exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
