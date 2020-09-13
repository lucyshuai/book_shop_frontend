import React from "react";
import ReactDOM from "react-dom";
import MainApp from "./component/MainApp";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
