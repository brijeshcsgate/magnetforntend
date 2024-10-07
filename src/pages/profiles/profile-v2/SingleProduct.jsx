import React, { useContext } from "react";
import styles from "./styles/profileV2.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
const SingleProduct = ({ item }) => {
  const { choosenColor, setServiceModalDataV2 } = useContext(ContextAPI);
  const handleSendServiceV1ModalData = (ele) => {
    setServiceModalDataV2(ele);
  };

  const getShortText = (text, limit) => {
    if (text && limit) {
      let str = text?.split("");
      let shortText = str?.slice(0, limit);
      return `${shortText.join("")}....`;
    }
  };
  return (
    <>
      <div className={styles.singleProductContainer}>
        <div
          id="carouselExampleSlidesOnly"
          className={`${styles.singleProductImage} carousel slide`}
          data-bs-ride="carousel"
        >
          <div className={`${styles.ProductCarouselInner} carousel-inner`}>
            <div className={`${styles.carouselItem} carousel-item active`}>
              <img
                className={`${styles.productImg} d-block w-100 h-100`}
                src={`${process.env.PUBLIC_URL + "/img/1.png"}`}
                alt=""
              />
            </div>
            <div className={`${styles.carouselItem} carousel-item`}>
              <img
                className="d-block w-100"
                src={`https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60`}
                alt=""
              />
            </div>
            <div className={`${styles.carouselItem} carousel-item`}>
              <img
                className="d-block w-100"
                src={`https://images.unsplash.com/photo-1608541737042-87a12275d313?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.singleProductDetails}>
          <div>
            <div className={styles.singleProductTitle}>
              <h2 className="text-uppercase text-secondary">{`nike`}</h2>
            </div>
            <div
              className={`${styles.singleProductText} text-secondary`}
              style={{
                fontSize: "15px",
                color: "gray",
                minHeight: "4rem",
              }}
            >
              {getShortText(item.description, 180)}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.2rem",
                color: `${choosenColor}`,
              }}
            >
              <span>&#8377;</span>
              <h4>{item.price}</h4>
            </div>
            <div className="text-secondary">
              MRP:{" "}
              <span className="text-decoration-line-through">{item.mrp}</span>
            </div>
            <div>
              <p style={{ color: `${choosenColor}` }}>{item.website}</p>
            </div>
            <div className={styles.singleProductButtons}>
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

export default SingleProduct;
