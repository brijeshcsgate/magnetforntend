import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";

const ImportantLink = () => {
  const { isScrolled, choosenColor } = useContext(ContextAPI);
  return (
    <div className={styles.OffersContainer}>
      <h2 className="text-secondary">Important Link</h2>
      <div className={styles.linkContainer}>
        <div className={styles.singleLink}>
          <img src={`${process.env.PUBLIC_URL + "/img/word.png"}`} alt="word" />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 1
          </div>
        </div>
        <div className={styles.singleLink}>
          <img
            src={`${process.env.PUBLIC_URL + "/img/excel.png"}`}
            alt="word"
          />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 2
          </div>
        </div>
        <div className={styles.singleLink}>
          <img
            src={`${process.env.PUBLIC_URL + "/img/powerpoint.png"}`}
            alt="word"
          />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 3
          </div>
        </div>
        <div className={styles.singleLink}>
          <img src={`${process.env.PUBLIC_URL + "/img/pdf.png"}`} alt="word" />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 4
          </div>
        </div>
        <div className={styles.singleLink}>
          <img src={`${process.env.PUBLIC_URL + "/img/csv.png"}`} alt="word" />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 5
          </div>
        </div>
        <div className={styles.singleLink}>
          <img
            src={`${process.env.PUBLIC_URL + "/img/link_ico.png"}`}
            alt="word"
          />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
            Link Name 6
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantLink;
