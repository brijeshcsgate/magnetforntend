import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import ServiceModal from "../../../components/profile-v2/ServiceModal";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
const SingleService = ({ item }) => {
  const { setServiceModalDataV2 } = useContext(ContextAPI);
  const handleSendServiceV1ModalData = (ele) => {
    setServiceModalDataV2(ele);
  };
  return (
    <>
      <div className={styles.singleServiceContainer}>
        <div className={styles.singleServiceImage}>
          <img src={`${process.env.PUBLIC_URL + "/img/1.png"}`} alt="" />
        </div>
        <div className={styles.singleServiceDetails}>
          <div>
            <div className={styles.singleServiceTitle}>
              <h3 className="text-secondary">{item.title}</h3>
            </div>
            <div className={`${styles.singleServiceText} text-secondary`}>
              {item.description}
            </div>
            <div className={styles.singleServiceButtons}>
              <button
                className="text-secondary"
                data-bs-toggle="modal"
                data-bs-target="#serviceModal"
                onClick={() => handleSendServiceV1ModalData(item)}
              >
                View Details
              </button>

              <button className="text-secondary">Enquiry</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleService;
