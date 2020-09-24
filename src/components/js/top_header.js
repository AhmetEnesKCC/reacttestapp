import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../module css/top_header.module.css";

export default function TopHeader() {
  return (
    <header className={styles.header}>
      <a href="tel:0555-555-55-55" className={styles.contact_link}>
        <div className={styles.contact}>
          <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> +90 555 555 5555
        </div>
      </a>
    </header>
  );
}
