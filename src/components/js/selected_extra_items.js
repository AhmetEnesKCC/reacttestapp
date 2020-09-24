import { Checkbox } from "@material-ui/core";
import React from "react";
import styles from "../module css/selected_extra_items.module.css";

export default function ExtraItems(props) {
  return (
    <div className={styles.container}>
      {props.name}
      <div style={{ textDecoration: typeof props.price === "number" ? "none" : "line-through" }}>{props.price}</div>
      <div>{props.discountedPrice}</div>
      <Checkbox checked={true} style={{ color: "black" }}></Checkbox>
      <div>{props.number}</div>
    </div>
  );
}
