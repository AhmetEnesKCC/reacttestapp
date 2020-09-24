import React from "react";
import styles from "../module css/footer.module.css";
export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyRight}>All Right Reserved © Inc {new Date().getFullYear()}</div>
    </footer>
  );
}
