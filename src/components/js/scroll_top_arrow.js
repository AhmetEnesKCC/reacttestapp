import { faArrowAltCircleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styles from "../module css/scroll_top_arrow.module.css";

export default function ScrollTopArrow() {
  const [scrolled, setScrolled] = useState(false);
  document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });
  return (
    <div
      className={styles.arrow_container}
      style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
      onClick={() => document.documentElement.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
    </div>
  );
}
