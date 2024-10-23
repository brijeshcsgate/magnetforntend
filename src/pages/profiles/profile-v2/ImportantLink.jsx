import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";

const ImportantLink = ({documentsLinks}) => {
  const { isScrolled, choosenColor } = useContext(ContextAPI);
  return (
    <div className={styles.OffersContainer}>
      <h2 className="text-secondary">Important Link</h2>
      <div className={styles.linkContainer}>
      {documentsLinks?.map((link, index) => (
                      
        <div className={styles.singleLink}>
          <img
            src={`${"/img/link_ico.png"}`}
            alt="word"
          />
          <div style={{ color: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
          {link?.name}
          </div>
        </div>
         ))}
      </div>
    </div>
  );
};

export default ImportantLink;
