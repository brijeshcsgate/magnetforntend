
import React from "react";
import Slider from "react-slick";
import "./IndicatorSlider.css";
import imageSlider1 from "../../../assets/images/login-Option-1.svg";
import imageSlider2 from "../../../assets/images/login-Option-2.svg";
import imageSlider3 from "../../../assets/images/login-Option-3.svg";
import imageSlider4 from "../../../assets/images/login-Option-4.svg";
import logo from "../../../assets/images/mag_logo.png";



const sliderData = [
  {
    image: imageSlider1,
    altText: "slider1_image",
    title: <>Build Better Communications With <br/> Peers & Businesses</>,
  },
  {
    image: imageSlider2,
    altText: "slider2_image",
    title: <>Build Better Communications With <br/> Peers & Businesses</>,
  },
  {
    image: imageSlider3,
    altText: "slider3_image",
    title:<>Build Better Communications With <br/> Peers & Businesses</>,
  },
  {
    image: imageSlider4,
    altText: "slider4_image",
    title: <>Build Better Communications With <br/> Peers & Businesses</>,
  },
];

const IndicatoreSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>

        {sliderData.map((slide, index) => (
          <div className="slider-img-div add-background" key={index}>
            <img className="slider-img" src={slide.image} alt={slide.altText} />
            <div className="setLogo">
              <img src={logo} alt="login logo" />
            </div>

            <div className="image-title-para">
              <div className="heading-600-24 c-white">{slide.title}</div>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};
export default IndicatoreSlider;
