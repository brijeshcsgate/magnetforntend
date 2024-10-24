
import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import TextToggler from "@/pages/ProfilePages/TextToggler";
import ImageSliderBulk2 from "@/pages/ProfilePages/ImageSliderBulk2";
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import ProductTempModal from "@/components/profile-v2/ProductTempModal";
const SingleProduct = ({ item, profileUserId, visitorInfo }) => {

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
              MRP:{" "}              <span>{item.price}</span>         </div>
            <div className={styles.singleServiceButtons}>
              <ProductTempModal item={item} />
              <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} cl='text-secondary' />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
