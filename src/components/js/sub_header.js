import { faArrowCircleLeft, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menus } from "../../assets/menu.json";
import styles from "../module css/sub_header.module.css";
export default function SubHeader() {
  var subheader;
  const native = useSelector((state) => state.native);
  useEffect(() => {
    subheader = document.getElementsByClassName("subheader_container")[0];
    subheader.style.cursor = "grab";
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = (e) => {
      subheader.style.cursor = "grabbing";
      subheader.style.userSelect = "none";

      pos = {
        left: subheader.scrollLeft,
        top: subheader.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = (e) => {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      subheader.scrollTop = pos.top - dy;
      subheader.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      subheader.style.cursor = "grab";
      subheader.style.removeProperty("user-select");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    subheader.addEventListener("mousedown", mouseDownHandler);
  });

  const scrollStart = () => {
    subheader.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollLeft = () => {
    subheader.scrollTo({ left: subheader.scrollLeft - (native ? window.innerWidth : 800), behavior: "smooth" });
  };
  const scrollRight = () => {
    subheader.scrollTo({ left: subheader.scrollLeft + (native ? window.innerWidth : 800), behavior: "smooth" });
  };
  return (
    <div className={[styles.header_container, "subheader_container"].join(" ")}>
      <header
        style={{ width: native ? `${menus.find((item) => item.key === "main").items.length * 100}%` : "200%" }}
        className={[styles.header, "subheader"].join(" ")}
      >
        <div className={styles.arrow_left} onClick={() => scrollLeft()}>
          <FontAwesomeIcon icon={faArrowLeft} color={"white"} size={"2x"}></FontAwesomeIcon>
        </div>
        {menus
          .find((item) => item.key === "main")
          .items.map((item) => (
            <Link
              key={item.name}
              onClick={() => scrollStart()}
              style={{ textDecoration: "none", pointerEvents: "" }}
              to={"/menuler/" + item.name.toLowerCase()}
            >
              <div className={styles.sub_menu_link}>{item.name}</div>
            </Link>
          ))}
        <div className={styles.arrow_right} onClick={() => scrollRight()}>
          <FontAwesomeIcon icon={faArrowRight} color={"white"} size={"2x"}></FontAwesomeIcon>
        </div>
      </header>
    </div>
  );
}
