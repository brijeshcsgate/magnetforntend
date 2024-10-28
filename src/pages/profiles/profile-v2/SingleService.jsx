import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import ServiceModal from "../../../components/profile-v2/ServiceModal";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import TextToggler from "@/pages/ProfilePages/TextToggler";
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import { resizeImage } from "@/pages/ProfilePages/resizeImage";
const SingleService = ({ item,profileUserId, visitorInfo }) => {
  const { setServiceModalDataV2 } = useContext(ContextAPI);
  const handleSendServiceV1ModalData = (ele) => {
    setServiceModalDataV2(ele);
  };
  return (
    <>
      <div className={styles.singleServiceContainer}>
        <div className={styles.singleServiceImage}>
          <img src={item.image} alt={item.name}    className={styles.mgv2objectFitcover}
       />
        </div>
        <div className={styles.singleServiceDetails}>
          <div>
            <div className={styles.singleServiceTitle}>
              <h3 className="text-secondary">{item.name}</h3>
            </div>
            <div className={`${styles.singleServiceText} text-secondary`}>
            <TextToggler text={item.description} charLimit={280} isShowBtn={false} />
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

              {/* <button className="text-secondary">Enquiry</button> */}
              <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} cl='text-secondary'/>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleService;
