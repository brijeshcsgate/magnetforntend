import React from "react";
import Slider from "react-slick";
import "./IndicatorSlider.css";
import imageSlider1 from "../../../assets/images/login-Option-1.svg";
import imageSlider2 from "../../../assets/images/login-Option-2.svg";
import imageSlider3 from "../../../assets/images/login-Option-3.svg";
import imageSlider4 from "../../../assets/images/login-Option-4.svg";
import logo from "../../../assets/images/mag_logo.png";
const IndicatoreSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider1} alt="slider2_image" />
          <div className="setLogo">
            <img src={logo} alt="login logo" />
          </div>


          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Build Better Communications With Peers
              & Businesses
            </div>
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider2} alt="slider3_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Build Better Communications With Peers
              & Businesses
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/mag_logo.png" alt="login logo" />
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider3} alt="slider4_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Build Better Communications With Peers
              & Businesses
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/mag_logo.png" alt="login logo" />
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider4} alt="slider4_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Build Better Communications With Peers
              & Businesses
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/mag_logo.png" alt="login logo" />
            {/* Build Better Communications With Peers
            & Businesses */}
          </div>
        </div>
      </Slider>
    </div>
  );
};
export default IndicatoreSlider;
