import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import styles from "../module css/search_bar.module.css";
import SearchIcon from "../../assets/svg/search_icon";
import { useDispatch, useSelector } from "react-redux";
import { searchStateAction, searchValueAction } from "../../redux/reducers";
import { Link } from "react-router-dom";

export default function SearchBar(props) {
  const search_state = useSelector((state) => state.searching);
  const search_value = useSelector((state) => state.serch_value);

  const dispatch = useDispatch();

  const search_input_ref = useRef();
  const handleChange = (e) => {
    dispatch(searchValueAction(e.target.value));
  };

  return (
    <div className={styles.search_bar_container}>
      <SearchIcon
        className={styles.search_icon}
        style={{
          left: !search_state
            ? search_input_ref.current && search_input_ref.current.value.length > 0
              ? 210
              : 20
            : 210,
        }}
      />

      <input
        ref={search_input_ref}
        id="search_bar"
        onFocus={() => {
          dispatch(searchStateAction(true));
          document.getElementById("search_dummy").click();
        }}
        onChange={handleChange}
        onBlur={() => {
          dispatch(searchStateAction(false));

          search_input_ref.current.value = "";
        }}
        type="search"
        className={styles.search_bar}
        style={{ width: search_state ? 250 : 170 }}
      ></input>
    </div>
  );
}
