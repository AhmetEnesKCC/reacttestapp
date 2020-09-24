import React from "react";
import styles from "../module css/header_items.module.css";
import { Link } from "react-router-dom";
import { faUtensils, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderItems(props) {
  const menus = ["menuler", "sepet"];

  const icons = {
    sepet: faShoppingCart,
    menuler: faUtensils,
  };
  return (
    <div className={styles.items_container}>
      {menus.map((menu) => (
        <Link to={`/` + menu} key={menu}>
          <div className={styles.header_item}>
            <div className={styles.header_item_text}>{menu.replace("u", "ü")}</div>
            <FontAwesomeIcon className={styles.header_item_icon} icon={icons[menu]}></FontAwesomeIcon>
          </div>
        </Link>
      ))}
    </div>
  );
}
