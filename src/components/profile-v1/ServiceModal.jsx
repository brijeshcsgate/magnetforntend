import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ContextAPI } from "../../contextAPI/ContextProfileV2";
import style from "./modal.module.css";
const ServiceModal = (isOpenModal) => {
  const { viewDetialsModalV1 } = useContext(ContextAPI);

  console.log('viewDetialsModalV1',viewDetialsModalV1)
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
        id="serviceModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className={`${style.modalDescription} modal-content`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {"Life "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Slider {...settings} arrows={null} dots={null}>
                <div>
                  <img
                    width={`100%`}
                    className={`card `}
                    src={"/img/cover.jpg"}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width={`100%`}
                    className={`card `}
                    src={"/img/cover.jpg"}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width={`100%`}
                    className={`card `}
                    src={"/img/cover.jpg"}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width={`100%`}
                    className={`card `}
                    src={"/img/cover.jpg"}
                    alt=""
                  />
                </div>
              </Slider>
            </div>
            <div className="modal-footer">{viewDetialsModalV1.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
