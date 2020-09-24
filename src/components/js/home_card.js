import React, { useEffect, useRef } from "react";
import styles from "../module css/home_card.module.css";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function HomeCard(props) {
  const dispatch = useDispatch();
  const homeCardRef = useRef();
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    homeCardRef.current.classList.add(styles.home_card_animation);
  });
  return (
    <div className={styles.card_container}>
      <Link to={"/menuler/" + props.name.toLowerCase()} onClick={() => goTop()} style={{ textDecoration: "none" }}>
        <div className={styles.card} ref={homeCardRef}>
          <div className={styles.card_image}>
            <img alt={props.name} src={"/src/" + props.image}></img>
          </div>
          <Parallax y={[-40, 50]}>
            <div className={[styles.card_title].join(" ")}>{props.name}</div>
          </Parallax>
        </div>
      </Link>
    </div>
  );
}
