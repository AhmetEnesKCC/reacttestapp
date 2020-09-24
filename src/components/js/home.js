import React from "react";
import styles from "../module css/home.module.css";
import { menus } from "../../assets/menu.json";
import HomeCard from "./home_card";

export default function Home() {
  return (
    <div className={styles.content}>
      {menus
        .find((item) => item.key === "main")
        .items.map((item) => (
          <HomeCard
            name={item.name}
            image={item.image}
            index={menus.find((item) => item.key === "main").items.indexOf(item)}
          />
        ))}
    </div>
  );
}
