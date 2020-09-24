import React from "react";
import styles from "../module css/home.module.css";
import { menus } from "../../assets/menu.json";
import SubMenu from "./sub_menu";
export default function MainMenu({ match }) {
  return (
    <div className={styles.content}>
      {menus
        .find((item) => item.key.toLowerCase() === "main")
        .items.find((item) => item.name.toLowerCase() === match.params.name.toLowerCase())
        .items.map((item) => (
          <SubMenu
            {...item}
            domName={match.params.name.toLowerCase()}
            index={menus
              .find((subItem) => subItem.key === "main")
              .items.find((subItem) => subItem.name.toLowerCase().replace("/", "-") === match.params.name.toLowerCase())
              .items.indexOf(
                menus
                  .find((subItem) => subItem.key === "main")
                  .items.find((subItem) => subItem.name.toLowerCase() === match.params.name.toLowerCase())
                  .items.find(
                    (subItem) =>
                      subItem.name.toLowerCase().replace("/", "-") === item.name.toLowerCase().replace("/", "-"),
                  ),
              )}
          />
        ))}
    </div>
  );
}
