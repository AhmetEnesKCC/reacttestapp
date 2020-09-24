import ReactDOM from "react-dom";
import React from "react";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "./redux/reducers.js";
import { ParallaxProvider } from "react-scroll-parallax";
const middleWare = [Thunk];
const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleWare),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      function (f) {
        return f;
      },
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ParallaxProvider scrollAxis="vertical">
      <App />
    </ParallaxProvider>
  </Provider>,
  document.getElementById("app"),
);
