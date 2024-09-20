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
            <div className="setmessage">
              A data-driven & collaborative system to enhance transparency,
              accountability, and operational efficiency with UPSRTC's
              comprehensive
              <br />
              Depot Management System.
            </div>
          </div>
          <div className="image-title-para">
            <div className="heading-600-24 c-white">Depot Fleet Operation</div>
            <div className="heading-400-14 c-white">
              360° management of operations with <br />
              automated Fleet Dispatch System
            </div>
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider2} alt="slider3_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Human Resource <br />
              Management System
            </div>
            <div className="heading-400-16 c-white">
              Holistic human resource system for <br />
              better operations
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/loginlogo.svg" alt="login logo" />
            <div className="setmessage">
              A data-driven & collaborative system to enhance transparency,
              accountability, and operational efficiency with UPSRTC's
              comprehensive
              <br />
              Depot Management System.
            </div>
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider3} alt="slider4_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Assets & Inventory <br />
              Management System
            </div>
            <div className="heading-400-16 c-white">
              Ensuring Net 0 tolerance towards road mishaps <br />
              adhering to strict maintenance guidelines
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/loginlogo.svg" alt="login logo" />
            <div className="setmessage">
              A data-driven & collaborative system to enhance transparency,
              accountability, and operational efficiency with UPSRTC's
              comprehensive
              <br />
              Depot Management System.
            </div>
          </div>
        </div>
        <div className="slider-img-div add-background">
          <img className="slider-img" src={imageSlider4} alt="slider4_image" />
          <div className="image-title-para">
            <div className="heading-600-24 c-white">
              Workshop & <br />
              Fleet Maintenance
            </div>
            <div className="heading-400-16 c-white">
              One access eye-view of all the assets &<br />
              inventories across the corporation
            </div>
          </div>
          <div className="setLogo">
            <img src="/assets/images/loginlogo.svg" alt="login logo" />
            <div className="setmessage">
              A data-driven & collaborative system to enhance transparency,
              accountability, and operational efficiency with UPSRTC's
              comprehensive
              <br />
              Depot Management System.
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
export default IndicatoreSlider;
