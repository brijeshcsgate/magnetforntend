import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ContextAPI } from "../../contextAPI/ContextProfileV2";
import ImageSliderBulk2 from "@/pages/ProfilePages/ImageSliderBulk2";
const ProductModal = (isOpenModal) => {
  const { productModalDataV2 } = useContext(ContextAPI);
  console.log('productModalDataV2----------------------3',productModalDataV2.name)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ width: "90%" }}>
      {/* <!-- Modal --> */}
      <div
        className={isOpenModal ? "modal fade" : ""}
        id="productModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {productModalDataV2.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <ImageSliderBulk2 images={productModalDataV2?.image} autoChangeInterval={2000} />

              {/* {JSON.stringify(productModalDataV2)} */}
            </div>
            <div className="modal-footer">{productModalDataV2.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
