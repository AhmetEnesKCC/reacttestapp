import React from "react";
import { useSelector } from "react-redux";
import BasketItem from "./basketItem";
import styles from "../module css/basket.module.css";
export default function Basket() {
  const basket = useSelector((state) => state.basket);
  const total = useSelector((state) => state.total);
  const native = useSelector((state) => state.native);

  return (
    <div className={styles.content}>
      {basket.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "var(--ff)",
            fontSize: 30,
            textAlign: "center",
            marginTop: 100,
          }}
        >
          Sepetiniz Bos. Doldurmaya Ne Dersiniz ?
        </div>
      ) : (
        <div>
          {basket.map((item) => (
            <BasketItem {...item}>{item.name}</BasketItem>
          ))}
          <div className={styles.totalPrice}>
            <div className={styles.plus}>+</div>
            <hr className={styles.rule}></hr>
          </div>
          <div className={styles.total}>{Math.round(total * 100) / 100}</div>
        </div>
      )}
    </div>
  );
}
