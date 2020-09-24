import React from "react";
import styles from "../module css/header.module.css";
import Logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import HeaderItems from "./header_items";
import SearchBar from "./search_bar";

export default function Header(props) {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={Logo}></img>
      </Link>
      <div className={styles.header_content}>
        <SearchBar />
        <HeaderItems></HeaderItems>
      </div>
    </header>
  );
}
