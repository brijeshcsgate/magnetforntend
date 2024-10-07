import React from "react";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Slider from "react-slick";
import styles from "./styles/profileV1.module.css"
const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div>
      <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">Testimonials</span>
          </span>{" "}
          Details
        </div>
      </div>
      <div style={{ padding: "4rem 1rem" }}>
        <Slider {...settings} arrows={null}>
          <div>
            <p>
              <span style={{ paddingRight: `1rem` }}>
                <ImQuotesLeft />
              </span>
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, accusantium quae. Id veniam adipisci odio error sint quae? Tenetur, rerum.`}{" "}
              <span style={{ paddingLeft: `1rem` }}>
                <ImQuotesRight />
              </span>{" "}
            </p>
          </div>
          <div>
            <p>
              <span style={{ paddingRight: `1rem` }}>
                <ImQuotesLeft />
              </span>
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, accusantium quae. Id veniam adipisci odio error sint quae? Tenetur, rerum.`}{" "}
              <span style={{ paddingLeft: `1rem` }}>
                <ImQuotesRight />
              </span>{" "}
            </p>
          </div>
          <div>
            <p>
              <span style={{ paddingRight: `1rem` }}>
                <ImQuotesLeft />
              </span>
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, accusantium quae. Id veniam adipisci odio error sint quae? Tenetur, rerum.`}{" "}
              <span style={{ paddingLeft: `1rem` }}>
                <ImQuotesRight />
              </span>{" "}
            </p>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Testimonials;
