
import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import ServiceModal from "../../../components/profile-v2/ServiceModal";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import TextToggler from "@/pages/ProfilePages/TextToggler";
import ImageSliderBulk from "@/pages/ProfilePages/ImageSliderBulk";
import ImageSliderBulk2 from "@/pages/ProfilePages/ImageSliderBulk2";
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import ProductTempModal from "@/components/profile-v2/ProductTempModal";
const SingleProduct = ({ item, profileUserId, visitorInfo }) => {
  const { setProductModalDataV2 } = useContext(ContextAPI);
  const handleSendServiceV1ModalData = (ele) => {
    setProductModalDataV2(ele);
    console.log(ele, '---------------------------1')
  };
  return (
    <>
      <div className={styles.singleServiceContainer}>
        <div className={styles.singleServiceImage}>
          {/* <img src={item.image} alt={item.name} /> */}
          <ImageSliderBulk2 images={item?.image} autoChangeInterval={2000} />

        </div>
        <div className={styles.singleServiceDetails}>
          <div>
            <div className={styles.singleServiceTitle}>
              <h3 className="text-secondary">{item.name}</h3>
            </div>
            <div className={`${styles.singleServiceText} text-secondary`}>
              <TextToggler text={item.description} charLimit={280} isShowBtn={false} />
            </div>
            <div className="text-secondary">
              MRP:{" "}              <span>{item.price}</span>
              {/* <span className="text-decoration-line-through">{item.price}</span> */}            </div>
            <div className={styles.singleServiceButtons}>
              {/* <button
                className="text-secondary"
                data-bs-toggle="modal"
                data-bs-target="#productModal"
                onClick={() => handleSendServiceV1ModalData(item)}
              >
                View Details
              </button> */}
              <ProductTempModal item={item}/>
              {/* <button className="text-secondary">Enquiry</button> */}
              <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} cl='text-secondary' />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
