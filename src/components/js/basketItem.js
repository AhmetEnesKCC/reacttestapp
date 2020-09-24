import React from "react";
import styles from "../module css/basketItem.module.css";
export default function BasketItem(props) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div>{props.name}</div> <div>{props.price}</div>
      </div>

      {props.submenus.map((menu) => (
        <div key="menu" className={styles.sub}>
          <div>{menu.discounted.name}</div> <div>{menu.normal.price}</div>
        </div>
      ))}
      <hr></hr>
    </div>
  );
}
