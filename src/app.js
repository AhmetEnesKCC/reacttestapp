import React, { useEffect } from "react";
import "./styles/css/main.css";
import { HashRouter, Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Header from "./components/js/header.js";
import Home from "./components/js/home";
import Footer from "./components/js/footer.js";
import MainMenu from "./components/js/main_menu.js";
import { useDispatch, useSelector } from "react-redux";
import SubMenuSelected from "./components/js/submenu_selected";
import SubHeader from "./components/js/sub_header";
import ScrollTopArrow from "./components/js/scroll_top_arrow";
import TopHeader from "./components/js/top_header";
import { setNativeAction } from "./redux/reducers";
import Basket from "./components/js/basket";
import Searching from "./components/js/searching";
export default function App() {
  const native = useSelector((state) => state.native);
  const dispatch = useDispatch();
  const searching = useSelector((state) => state.searching);
  useEffect(() => {
    dispatch(setNativeAction(window.innerWidth > 900 ? false : true));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        dispatch(setNativeAction(false));
      } else {
        dispatch(setNativeAction(true));
      }
    });
  });

  return (
    <HashRouter>
      <TopHeader></TopHeader>
      <Header></Header>
      <SubHeader></SubHeader>
      <Switch>
        <Route path="/" exact render={() => <Home name="main"></Home>}></Route>
        <Route path="/menuler" exact render={() => <Home name="main"></Home>}></Route>
        <Route path="/menuler/:name" component={MainMenu} exact></Route>
        <Route path="/menuler/:name/:subname" component={SubMenuSelected}></Route>
        <Route path="/sepet" component={Basket}></Route>
        <Route path="/search" component={Searching}></Route>
      </Switch>
      {native ? "" : <ScrollTopArrow></ScrollTopArrow>}
      <Footer></Footer>
      <Link id="search_dummy" to="/search"></Link>
    </HashRouter>
  );
}
