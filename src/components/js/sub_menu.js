import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../module css/sub_menu.module.css";
import { searchValueAction } from "../../redux/reducers";

export default function SubMenu(props) {
  const search_state = useSelector((state) => state.searching);
  const dispatch = useDispatch();

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return (
    <div className={styles.main_container}>
      <div
        className={styles.content}
        style={{
          flexDirection: props.index % 2 === 0 ? "row" : "row-reverse",
        }}
      >
        <div className={styles.image_container}>
          <img src={"/src/" + props.image}></img>
        </div>
        <div
          className={styles.info_container}
          style={{ alignItems: props.index % 2 === 0 ? "flex-end" : "flex-start" }}
        >
          <div className={styles.name}>{props.name}</div>
          <div className={styles.price}>
            {props.price} TL
            <Link
              onClick={() => goTop()}
              to={"/menuler/" + props.domName.toLowerCase() + "/" + props.name.toLowerCase().replace("/", "-")}
            >
              <button className={styles.buy_btn}>Sepete Ekle</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={SubMenu}></div>
    </div>
  );
}
