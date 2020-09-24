import React from "react";
import { useSelector } from "react-redux";
import { menus } from "../../assets/menu.json";
import styles from "../module css/searching.module.css";
import HomeCard from "./home_card";
import SubMenu from "./sub_menu";

export default function Searching() {
  const search_value = useSelector((state) => state.search_value);
  const searchItem = (item) => {
    var arr = [];
    var found = menus.find((item) => item.key === "main").items;
    for (var i = 0; i < found.length; i++) {
      var isStoped = false;
      for (var b = 0; b < found[i].items.length; b++) {
        if (found[i].items[b].name.toLowerCase().match(search_value.toLowerCase())) {
          arr.push({ main: found[i].items[b], dom: found[i] });
        }
      }
    }

    return arr;
  };
  return (
    <div className={styles.content}>
      {searchItem().map((item) => (
        <SubMenu
          name={item.main.name}
          image={item.main.image}
          domName={item.dom.name}
          index={menus
            .find((subItem) => subItem.key === "main")
            .items.find((subItem) => subItem.name.toLowerCase() === item.dom.name.toLowerCase())
            .items.indexOf(
              menus
                .find((subItem) => subItem.key === "main")
                .items.find((subItem) => subItem.name.toLowerCase() === item.dom.name.toLowerCase())
                .items.find((subItem) => subItem.name.toLowerCase() === item.main.name.toLowerCase()),
            )}
          price={item.main.price}
        ></SubMenu>
      ))}
    </div>
  );
}
