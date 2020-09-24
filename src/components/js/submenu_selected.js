import React, { useEffect, useState } from "react";
import styles from "../module css/submenus_selected.module.css";
import { menus } from "../../assets/menu.json";
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import ExtraItems from "./selected_extra_items";
import { useDispatch, useSelector } from "react-redux";
import { addbasketAction, totalPriceAction } from "../../redux/reducers";
import { Link } from "react-router-dom";

export default function SubMenuSelected({ match }) {
  const native = useSelector((state) => state.native);
  const total = useSelector((state) => state.total);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      fontSize: 30,
      top: "-30px",
      width: 400,
    },
    select: {
      width: native ? "100%" : 400,
    },
    btn: {
      width: 50,
      height: 50,
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedItemKind, setSelectedItemKind] = useState("");
  const [foundItem, setFoundItem] = useState("");
  const [currentItem, setCurrentItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(undefined);
  const [noItem, setNoItem] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  var myItem;
  myItem = menus
    .find((items) => items.key === "main")
    .items.find((item) => item.name.toLowerCase() === match.params.name)
    .items.find((item) => item.name.toLowerCase().replace("/", "-") === match.params.subname);
  useEffect(() => {
    setTotalPrice(typeof myItem.price === "number" ? myItem.price : myItem.price.replace(",", "."));
  }, []);
  const handleChangeMenu = (e) => {
    setSelectedSubMenu(e.target.value);
    setSelectedSubItem("");
    setSelectedItemKind("");
  };

  const handleChangeItem = (e) => {
    setSelectedSubItem(e.target.value);
  };

  const handleChangeKind = (e) => {
    setSelectedItemKind(e.target.value);
  };

  const findItem = (item) => {
    var found = menus.find((item) => item.key === "main").items;
    for (var i = 0; i < found.length; i++) {
      var isStoped = false;
      for (var b = 0; b < found[i].items.length; b++) {
        if (found[i].items[b].name === item.name) {
          found = found[i].items[b];
          isStoped = true;
          break;
        }
      }
      if (isStoped) {
        break;
      }
    }

    return <div>{found.price}</div>;
  };

  const findItemDetailed = (item) => {
    var found = menus.find((item) => item.key === "main").items;
    for (var i = 0; i < found.length; i++) {
      var isStoped = false;
      for (var b = 0; b < found[i].items.length; b++) {
        if (found[i].items[b].name === item.name) {
          found = found[i].items[b];
          isStoped = true;
          break;
        }
      }
      if (isStoped) {
        break;
      }
    }

    return found;
  };

  const addItem = () => {
    if (checkItems() === false) {
      return;
    }
    if (selectedSubMenu !== "" && selectedSubMenu !== "Extra Menu Istemiyorum") {
      if (
        menus
          .find((item) => item.key === selectedSubMenu)
          .items.find((item) => item.name === selectedSubItem)
          .hasOwnProperty("items") &&
        selectedItemKind !== ""
      ) {
        setAddedItems([...addedItems, currentItem]);
      } else if (
        selectedSubItem !== "" &&
        menus
          .find((item) => item.key === selectedSubMenu)
          .items.find((item) => item.name === selectedSubItem)
          .hasOwnProperty("items") === false
      ) {
        setAddedItems([...addedItems, currentItem]);
      }
    }

    setTotalPrice(Math.round((getPrice() + revertPrice()) * 100) / 100);
  };

  const revertPrice = () => {
    return parseFloat(totalPrice);
  };

  const getPrice = () => {
    if (!currentItem.hasOwnProperty("price")) {
      var price;
      if (typeof foundItem.price === "number") {
        price = foundItem.price;
      } else if (typeof foundItem.price === "string") {
        price = parseFloat(foundItem.price.replace(",", "."));
      }
      return price;
    }
    if (typeof currentItem.price === "number") {
      return currentItem.price;
    } else if (typeof currentItem.price === "string") {
      return parseFloat(currentItem.price.replace(",", "."));
    }
  };

  const countNumber = (item) => {
    let count = 0;
    addedItems.forEach((ele) => {
      if (ele.name === item.name) {
        count++;
      }
    });
    return count;
  };

  const checkItems = () => {
    if (selectedSubItem === "") {
      return false;
    } else {
      if (
        selectedSubItem !== "" &&
        menus
          .find((item) => item.key === selectedSubMenu)
          .items.find((item) => item.name === selectedSubItem)
          .hasOwnProperty("items")
      ) {
        setNoItem(false);
      } else {
        setNoItem(true);
      }
    }
  };

  const finishOrder = () => {
    dispatch(totalPriceAction(parseFloat(totalPrice)));
    let item = {
      name: myItem.name,
      price: myItem.price,
      totalPrice: totalPrice,
      submenus: [
        ...addedItems.map((item) => ({
          discounted: item,
          normal: findItemDetailed(addedItems.find((items) => items.name === item.name)),
        })),
      ],
    };
    dispatch(addbasketAction(item));
  };

  return (
    <div className={styles.content}>
      <div className={styles.main_menu_title}>{typeof myItem === "object" && myItem.name}</div>

      <div className={styles.main_menu_container}>
        <div className={styles.images_container}>
          <div className={styles.main_menu_image}>
            <img
              src={
                typeof myItem === "object" &&
                "https://raw.githubusercontent.com/AhmetEnesKCC/reacttestapp/master/public/src/" + myItem.image
              }
            ></img>
          </div>
          <div>
            <div className={styles.sub_title}>Secilen Extra Lezzetler</div>
            <div className={styles.sub_menu_images}></div>
            {addedItems
              .filter((item, pos) => {
                return addedItems.indexOf(item) == pos;
              })
              .map((item) => {
                return (
                  <ExtraItems
                    key={item}
                    number={countNumber(item)}
                    name={item.name}
                    discountedPrice={item.price}
                    price={findItemDetailed(item).price}
                  />
                );
              })}
          </div>
        </div>
        <div className={styles.sub_menu_container}>
          <div className={styles.main_menu_price}>
            {typeof myItem === "object" && totalPrice} TL{" "}
            <Button disabled={selectedSubItem === ""} onClick={addItem}>
              Ekle
            </Button>{" "}
            <Link to="/sepet" style={{ textDecoration: "none", boxSizing: "border-box", display: "block" }}>
              <Button className={classes.btn} onClick={finishOrder}>
                Bitir
              </Button>
            </Link>
          </div>
          {typeof myItem === "object" && typeof myItem.subMenus === "object" ? (
            <FormControl className={classes.formControl}>
              <InputLabel color="secondary" className={classes.label} shrink id="demo-simple-select-disabled-label">
                Extra Menu Seciniz
              </InputLabel>
              <Select
                color="secondary"
                value={selectedSubMenu}
                labelId="demo-simple-select-disabled-label-label"
                id="demo-simple-select-disabled-label"
                displayEmpty
                className={(classes.selectEmpty, classes.select)}
                onChange={handleChangeMenu}
              >
                <MenuItem value="">Extra Menu Istemiyorum</MenuItem>
                {typeof myItem === "object" &&
                  typeof myItem.subMenus === "object" &&
                  myItem.subMenus.map((menu) => (
                    <MenuItem key={menu} value={menu}>
                      {menu}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl disabled className={classes.formControl}>
              <InputLabel className={classes.label} color="secondary" shrink>
                Extra Menu Seciniz
              </InputLabel>
              <Select className={classes.select} color="secondary" displayEmpty>
                <MenuItem>Sectiginiz Menu Extra Menu icermiyor</MenuItem>
              </Select>
            </FormControl>
          )}{" "}
          {typeof myItem === "object" && typeof myItem.subMenus === "object" && (
            <FormControl
              disabled={selectedSubMenu !== "" && selectedSubMenu !== "Extra Menu Istemiyorum" ? false : true}
              className={classes.formControl}
            >
              <InputLabel color="secondary" className={classes.label} shrink>
                Urun seciniz
              </InputLabel>
              <Select
                color="secondary"
                className={classes.select}
                value={selectedSubItem}
                onChange={handleChangeItem}
                displayEmpty
              >
                {selectedSubMenu !== "" &&
                  selectedSubMenu !== "Extra Menu Istemiyorum" &&
                  menus
                    .find((item) => item.key === selectedSubMenu)
                    .items.map(
                      (item) =>
                        item.name !== null && (
                          <MenuItem
                            key={item.name}
                            onClick={() => {
                              setCurrentItem(item);
                              setFoundItem(findItemDetailed(item));
                            }}
                            value={item.name}
                          >
                            {item.name}{" "}
                            <span
                              style={{
                                right: 20,
                                position: "absolute",
                                color: "red",
                                textDecoration: item.price ? "line-through" : "none",
                              }}
                            >
                              {findItem(item)}
                            </span>
                            <span style={{ right: 80, position: "absolute", color: "green" }}>{item.price}</span>
                          </MenuItem>
                        ),
                    )}
              </Select>
            </FormControl>
          )}{" "}
          {typeof myItem === "object" &&
            typeof myItem.subMenus === "object" &&
            selectedSubMenu !== "" &&
            selectedSubItem !== "" &&
            menus
              .find((item) => item.key === selectedSubMenu)
              .items.find((item) => item.name === selectedSubItem)
              .hasOwnProperty("items") && (
              <FormControl disabled={selectedSubItem !== "" ? false : true} className={classes.formControl}>
                <InputLabel color="secondary" className={classes.label} shrink>
                  Urun Turu Seciniz
                </InputLabel>
                <Select color="secondary" value={selectedItemKind} onChange={handleChangeKind}>
                  {selectedSubMenu !== "" &&
                    selectedSubItem !== "" &&
                    menus
                      .find((item) => item.key === selectedSubMenu)
                      .items.find((item) => item.name === selectedSubItem)
                      .hasOwnProperty("items") &&
                    menus
                      .find((item) => item.key === selectedSubMenu)
                      .items.find((item) => item.name === selectedSubItem)
                      .items.map((item) => (
                        <MenuItem
                          key={item.name}
                          onClick={() => {
                            setCurrentItem(item);
                          }}
                          value={item.name}
                        >
                          {item.name}{" "}
                          <span style={{ right: 20, position: "absolute", color: "red" }}>{item.price}</span>
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            )}
        </div>
      </div>
    </div>
  );
}
