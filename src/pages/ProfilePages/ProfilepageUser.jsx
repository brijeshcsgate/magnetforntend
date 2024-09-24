
import React, { useEffect, useState } from "react";
import "../ProfilePageCss/basic.css";
import "../ProfilePageCss/layout.css";
import "../ProfilePageCss/ionicons.css";
import "../ProfilePageCss/owl-carousel.css";
import "../ProfilePageCss/magnific-popup.css";
// import "./animate.css";
import "../ProfilePageCss/custom.css";
import profile from "./Images/profile.jpg";
import qr from "./Images/qr.png";
import liclogo from "./Images/liclogo.png";
import img1 from "./Images/1.png";
import img2 from "./Images/2.jpg";
import img3 from "./Images/product.jpg";
import pdf from "./Images/pdf.png";
import word from "./Images/word.png";
import excel from "./Images/excel.png";
import csv from "./Images/csv.png";
import ppt from "./Images/powerpoint.png";
import linkico from "./Images/link_ico.png";
import bgimg from "./Images/slide-bg.jpg";
import "../ProfilePageCss/carousel.css";
// import axiosInstance from "./AxiosInstance";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { APIS } from "@/constants/api.constant";
import apiService from "@/lib/apiService";

const ProfilepageUser = () => {
  const slides = [
    { src: img3, text: "Caption Text" },
    { src: img3, text: "Caption Two" },
    { src: img3, text: "Caption Three" },
  ];
  const slides2 = [
    { src: img2, text: "Caption Text" },
    { src: img3, text: "Caption Two" },
    { src: img1, text: "Caption Three" },
  ];

  const slides3 = [
    { src: img3, text: "Caption Text" },
    { src: img2, text: "Caption Two" },
    { src: img1, text: "Caption Three" },
  ];

  const myFunction = () => {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "see more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "see less";
      moreText.style.display = "inline";
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(true);

  useEffect(() => {
    // Set the time interval for slide change (e.g., 3 seconds)
    const interval = setInterval(() => {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      // // setOut(true);
      // // handleNextImage ()
      // setCount(!count);
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [count, setCount] = useState(false);

  const nextSlide = () => {
    setCount(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
      setCount(false);
    }, 500); // Delay for animation
  };

  const [profileDetails, setProfileDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const topOffset = document.getElementById("profileName").offsetTop;
      const scrollPosition = window.scrollY;
      // console.log('scrollPosition',scrollPosition)
      // if (scrollPosition >= topOffset) {
      if (scrollPosition >= 288) {
        setIsSticky(true);

        console.log("scrollPositiontrue", scrollPosition);
      } else {
        setIsSticky(false);

        console.log("scrollPositionfalse", scrollPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { id } = useParams(); // Access the id from URL
  // Fetch profile details when the component mounts
  let profileId = id;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await axiosInstance.get(
        //   `/profile/details/${profileId}`
        // );
const id='653f450f13948a9fd7fb7a70'
        const response = await apiService.get(`${APIS.PROFILE_1}/${id }`);
        setProfileDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page" id="home-section">
      {/* Preloader */}
      <div className="preloader" style={{ display: "none" }}>
        <div className="centrize full-width">
          <div className="vertical-center">
            <div className="spinner" style={{ display: "none" }}>
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Started Background       background-image: url(images/works/slide-bg.jpg); */}
      <div className="started-bg">
        <div
          className="slide"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>
      </div>

      {/* Header */}
      <header>
      </header>

      {/* <!-- Header --> */}
      <header>
        <div className="top-menu">
          <a href="#" className="menu-btn">
            <span></span>
          </a>
        </div>
      </header>
      {/* <!-- Container --> */}

      <div className="container">
        {/* <!-- Started --> */}
        <section className="section started">
          <div className="st-box">
            <div className="st-bts">
              <a href="#popup-11" className="has-popup">
                <img src={qr} alt="" />
              </a>
            </div>
            <div
              className={`st-image ${isSticky ? "sticky" : ""}`}
              id="profileName"
            >
              <img src={'http://localhost:4005'+profileDetails?.profileImage} alt="" />
              <div className="st-title">{profileDetails?.name}</div>
            </div>
            <div className="profile-quote">
              {profileDetails?.profileShortDescription}
            </div>
            <div className="st-title">{profileDetails?.name}</div>
            <div className="st-subtitle">
              {profileDetails?.profession}
            </div>
            <div className="life-ins">{profileDetails?.jobRole}</div>
            <div className="center_icon">
            <img src={liclogo} className="liclogo" />
            </div>
            <div className="bts">
              <a href="#popup-form" className="btn btn_animated has-popup">
                <span className="circle center_icon">Refer Business</span>
              </a>
              <a
                href="javascript:void(0)"
                className="btn extra contact-btn btn_animated"
              >
                <span className="circle center_icon">Enquiry</span>
              </a>

              <a
                href="javascript:void(0)"
                className="btn extra contact-btn btn_animated"
              >
                <span className="circle center_icon">
                  <span
                    className="ink animate"
                    style={{
                      height: "167px",
                      width: "167px",
                      top: "-51.5px",
                      left: "35.2188px",
                    }}
                  ></span>
                  Save My Contact
                </span>
              </a>
            </div>
            <div className="st-soc">
              <a
                target="blank"
                href="https://www.facebook.com/"
                className="btn_animated"
              >
                <span className="circle center_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#304fff"
                      d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                    />
                    <path
                      fill="#fff"
                      d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                    />
                  </svg>
                </span>
              </a>
              <a
                target="blank"
                href="https://github.com/"
                className="btn_animated"
              >
                <span className="circle center_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </a>
              <a
                target="blank"
                href="https://twitter.com/"
                className="btn_animated"
              >
                <span className="circle center_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="-2 -4 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M20 1.907a8.3 8.3 0 0 1-2.356.637A4.07 4.07 0 0 0 19.448.31a8.4 8.4 0 0 1-2.607.98A4.12 4.12 0 0 0 13.846.015c-2.266 0-4.103 1.81-4.103 4.04q0 .476.106.92A11.7 11.7 0 0 1 1.393.754a3.96 3.96 0 0 0-.554 2.03a4.02 4.02 0 0 0 1.824 3.363A4.15 4.15 0 0 1 .805 5.64v.05c0 1.958 1.415 3.591 3.29 3.963a4.2 4.2 0 0 1-1.08.141q-.397 0-.773-.075a4.1 4.1 0 0 0 3.832 2.807a8.3 8.3 0 0 1-5.095 1.727q-.498-.001-.979-.056a11.73 11.73 0 0 0 6.289 1.818c7.547 0 11.673-6.157 11.673-11.496l-.014-.523A8.1 8.1 0 0 0 20 1.907"
                    />
                  </svg>
                </span>
              </a>
              <a href="skype:smorgan" className="btn_animated">
                <span className="circle center_icon">
                  <span
                    className="ink animate"
                    style={{
                      height: "40px",
                      width: "40px",
                      top: "7px",
                      left: "13.4375px",
                    }}
                  ></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#fff"
                      d="M6.65.584Q6.611.561 6.572.543l-.081.016zM.575 6.578q-.008.043-.012.081c.016.025.025.05.041.075l-.028-.156zm14.844 2.838l.016-.084c-.016-.025-.025-.05-.041-.075zM9.25 15.359q.039.023.078.041q.042-.008.084-.012z"
                    />
                    <path
                      fill="#fff"
                      d="m15.434 9.331l-.016.084l-.028-.162zc.081-.45.125-.909.125-1.369a7.54 7.54 0 0 0-2.213-5.344a7.6 7.6 0 0 0-2.4-1.619A7.5 7.5 0 0 0 8.005.405c-.481 0-.963.044-1.431.134h-.003q.039.017.078.041L6.49.555l.081-.016A4.5 4.5 0 0 0 4.474.014C3.28.014 2.155.48 1.311 1.323S.002 3.292.002 4.486c0 .759.197 1.509.563 2.169q.008-.043.012-.081l.028.159q-.023-.037-.041-.075a7.6 7.6 0 0 0-.112 1.303a7.5 7.5 0 0 0 2.213 5.341a7.54 7.54 0 0 0 6.666 2.094l-.078-.041l.162.028q-.042.008-.084.012a4.5 4.5 0 0 0 2.2.581c1.194 0 2.319-.466 3.162-1.309s1.309-1.969 1.309-3.162a4.5 4.5 0 0 0-.569-2.175zm-7.4 3.26c-2.684 0-3.884-1.319-3.884-2.309c0-.506.375-.863.891-.863c1.15 0 .85 1.65 2.994 1.65c1.097 0 1.703-.597 1.703-1.206c0-.366-.181-.772-.903-.95l-2.388-.597c-1.922-.481-2.272-1.522-2.272-2.5c0-2.028 1.909-2.791 3.703-2.791c1.653 0 3.6.913 3.6 2.131c0 .522-.453.825-.969.825c-.981 0-.8-1.356-2.775-1.356c-.981 0-1.522.444-1.522 1.078s.775.838 1.447.991l1.769.394c1.934.431 2.425 1.563 2.425 2.625c0 1.647-1.266 2.878-3.819 2.878"
                    />
                  </svg>
                </span>
              </a>
              <a
                target="blank"
                href="https://plus.google.com/"
                className="btn_animated"
              >
                <span className="circle center_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#fff"
                      d="M1.989 5.589c0 1.494.499 2.572 1.482 3.205c.806.52 1.74.598 2.226.598q.179-.002.279-.01s-.154 1.004.59 1.996h-.034c-1.289 0-5.493.269-5.493 3.727c0 3.516 3.861 3.695 4.636 3.695c.061 0 .097-.002.097-.002l.158.002c.497 0 1.782-.062 2.975-.643c1.548-.75 2.333-2.059 2.333-3.885c0-1.764-1.196-2.814-2.069-3.582c-.533-.469-.994-.873-.994-1.266c0-.4.337-.701.762-1.082c.689-.615 1.339-1.492 1.339-3.15c0-1.457-.189-2.436-1.354-3.057c.121-.062.551-.107.763-.137c.631-.086 1.554-.184 1.554-.699V1.2H6.64c-.046.002-4.651.172-4.651 4.389m7.424 9.013c.088 1.406-1.115 2.443-2.922 2.574c-1.835.135-3.345-.691-3.433-2.096c-.043-.676.254-1.336.835-1.863c.589-.533 1.398-.863 2.278-.928q.156-.01.31-.012c1.699.001 2.849.999 2.932 2.325M8.212 4.626c.451 1.588-.23 3.246-1.316 3.553a1.4 1.4 0 0 1-.384.052c-.994 0-1.979-1.006-2.345-2.393c-.204-.776-.187-1.458.047-2.112c.229-.645.643-1.078 1.163-1.225q.188-.053.385-.053c1.2 0 1.972.498 2.45 2.178M16 8V5h-2v3h-3v2h3v3h2v-3h3V8z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* <!-- Wrapper --> */}
        <div className="wrapper">
          {/* <!-- Section About --> */}
          <section className="section about" id="about-section">
            <div className="content-box">
              <div className="row">
                <div className="col col-m-12 col-t-5 col-d-5">
                  <div className="info-list">
                    <div className="contact-title">Contact Us</div>
                    <ul>
                      <li>
                        <strong>
                          <span>Mobile No:</span>
                        </strong>
                        (+91) 8126 139 074
                      </li>
                      <li>
                        <strong>
                          <span>WhatsApp No:</span>
                        </strong>{" "}
                        (+91) 8126 139 074
                      </li>
                      <li>
                        <strong>
                          <span>Email address:</span>
                        </strong>{" "}
                        gyanedra.s@troology.com
                      </li>
                      <li>
                        <strong>
                          <span>Website:</span>
                        </strong>{" "}
                        www.magnet.cards
                      </li>
                      <li>
                        <strong>
                          <span>Telegram:</span>
                        </strong>
                        @gyangps
                      </li>
                      <li>
                        <strong>
                          <span>Address:</span>
                        </strong>
                        4th Floor, Himanshu Sadan, 5 Park Road, Hazratganj,
                        Lucknow, Uttar Pradesh 226001
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col col-m-12 col-t-7 col-d-7">
                  <div className="text-box">
                    <div className="contact-title">About Me</div>
                    <p>
                      This section shall help you to have detailed information
                      about yourself. Create it quickly with Magnet’s set of
                      pre-defined ready to use templates across industries of
                      your ch<span id="dots">...</span>
                      <span id="more">
                        oice enim ligula venenatis dolor. Maecenas nisl est,
                        ultrices nec congue eget, auctor vitae massa. Fusce
                        luctus vestibulum augue ut aliquet. Nunc sagittis dictum
                        nisi, sed ullamcorper ipsum dignissim ac. In at libero
                        sed nunc venenatis imperdiet sed ornare turpis. Donec
                        vitae dui eget tellus gravida venenatis. Integer
                        fringilla congue eros non fermentum. Sed dapibus
                        pulvinar nibh tempor porta.
                      </span>
                      <span onclick="myFunction()" id="myBtn">
                        see more
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Services --> */}
          <section className="section works" id="works-section">
            <div className="title">Services</div>

            <div
              className="row box-items"
              style={{
                position: "relative",
                // height: '1879.14px'
              }}
            >
              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="1"
                style={{
                  visibility: "visible",
                  transform: "translateY(0px) scale(1)",
                  opacity: "1",
                  transition:
                    "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
                  left: "0%",
                  // top: '0px'
                }}
              >
                <div className="image">
                  <a href="#popup-1" className="has-popup">
                    <img src={img1} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-1" className="name has-popup">
                    LIFE INSURANCE
                  </a>
                  <p>
                    We are a team of professional Insurance and Financial
                    Advisors who are here to cater. So striking at of to
                    welcomed resolved.
                  </p>
                  <div className="service-bts">
                    <a href="#popup-1" className="btn btn_animated has-popup">
                      <span className="circle center_icon">View detail</span>
                    </a>
                    <a
                      href="#popup-1"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="2"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '616px'
                }}
              >
                <div className="image">
                  <a href="#popup-2" className="has-popup">
                    <img src={img1} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-2" className="name has-popup">
                    HEALTH INSURANCE
                  </a>
                  <p>
                    Preference any astonished unreserved mrs. Prosperous
                    understood middletons in conviction an uncommonly do.
                    Supposing so be resolving.
                  </p>
                  <div className="service-bts">
                    <a href="#popup-2" className="btn btn_animated has-popup">
                      <span className="circle center_icon">View detail</span>
                    </a>
                    <a
                      href="#popup-2"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="3"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '1232px'
                }}
              >
                <div className="image">
                  <a href="#popup-3" className="has-popup">
                    <img src={img1} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-3" className="name has-popup">
                    MUTUAL FUNDS
                  </a>
                  <p>
                    Do answered bachelor occasion in of offended no concerns.
                    Supply worthy warmth branch of no ye. Voice tried known to
                    as my to.
                  </p>
                  <div className="service-bts">
                    <a href="#popup-3" className="btn btn_animated has-popup">
                      <span className="circle center_icon">
                        <span
                          className="ink animate"
                          style={{
                            height: "130px",
                            width: "130px",
                            top: "-42.875px",
                            left: "-57.125px",
                          }}
                        ></span>
                        View detail
                      </span>
                    </a>
                    <a
                      href="#popup-3"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </section>

          {/* <!-- Products --> */}
          <section className="section works" id="Products-section">
            <div className="title">Products</div>

            <div
              className="row box-items"
              style={{
                position: "relative",
              }}
            >



<div className="row">
      {profileDetails?.products?.map((product, index) => (
        <div
          key={index}
          className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
          data-sr-id="4"
          style={{
            visibility: 'visible',
            transform: 'translateY(0px) scale(1)',
            opacity: '1',
            transition:
              'all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)',
            left: '0%',
            top: '0px',
          }}
        >
          <div className="image">
            <a href={`#popup-${index}`} className="has-popup">
              <img
                src={product?.image}
                // className="p-in-image-slide"
                className={`p-in-image-slide2 ${
                  count ? "p-in-slide-out" : "p-in-slide-in"
                }`}
                alt={product?.title}
              />
            </a>
          </div>
          <div className="content-box">
            <a href={`#popup-${index}`} className="name has-popup">
              {product?.title}
            </a>
            <p>{product?.description}</p>
            <div className="pricing">
              <i
                style={{
                  fontSize: '12px',
                  position: 'relative',
                  top: '-8px',
                }}
                className="fa fa-inr"
                aria-hidden="true"
              ></i>
              <a href="Javascript:void(0)" className="">
                {' '}
                {product?.price}
              </a>
              <br />
              <span className="mrp">M.R.P.: </span>
              <i
                style={{
                  fontSize: '10px',
                  position: 'relative',
                  top: '-1px',
                }}
                className="fa fa-inr"
                aria-hidden="true"
              ></i>
              <del> {product?.offerPrice}</del>
            </div>
            <a href={product?.websiteLink} className="product-link">
              {product?.websiteLink}
            </a>
            <div className="service-bts">
              <a href={`#popup-${index}`} className="btn btn_animated has-popup">
                <span className="circle center_icon">View detail</span>
              </a>
              <a
                href={`#popup-${index}`}
                className="btn extra contact-btn btn_animated has-popup"
              >
                <span className="circle center_icon">Enquiry</span>
              </a>
            </div>
          </div>

          {/* Popup Modal */}
          <div id={`#popup-${index}`} className="popup-box mfp-fade mfp-hide">
            <div className="content">
              <div className="desc">
                <h3 className="mr">{product?.title}</h3>
                <p>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>




              {/* new */}
              {/* <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="4"
                style={{
                  visibility: "visible",
                  transform: "translateY(0px) scale(1)",
                  opacity: "1",
                  transition:
                    "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
                  left: "0%",
                  top: "0px",
                }}
              >
                <div className="image">
                  <a href="#popup-5" className="has-popup">
                    <img
                      src={slides[currentIndex].src}
                      className={`p-in-image-slide ${
                        count ? "p-in-slide-out" : "p-in-slide-in"
                      }`}
                      alt="slide"
                    />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-4" className="name has-popup">
                    {title}
                  </a>
                  <p>
                    {description}
                  </p>
                  <div className="pricing">
                    <i
                      style={{
                        fontSize: "12px",
                        position: "relative",
                        top: "-8px",
                      }}
                      className="fa fa-inr"
                      aria-hidden="true"
                    ></i>
                    <a href="Javascript:void(0)" className="">
                      {" "}
                      {price}
                    </a>
                    <br />
                    <span className="mrp">M.R.P.: </span>
                    <i
                      style={{
                        fontSize: "10px",
                        position: "relative",
                        top: "-1px",
                      }}
                      className="fa fa-inr"
                      aria-hidden="true"
                    ></i>
                    <del> {offerPrice}</del>
                  </div>
                  <a href="javascript:void(0)" className="product-link">
                  {websiteLink}
                  </a>
                  <div className="service-bts">
                    <a href="#popup-4" className="btn btn_animated has-popup">
                      <span className="circle center_icon">View detail</span>
                    </a>
                    <a
                      href="#popup-4"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
                <div id="popup-4" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="desc">
                      <h3 className="mr">Nike</h3>
                      <p>
                        So striking at of to welcomed resolved. Northward by
                        described up household therefore attention. Excellence
                        decisively nay man yet impression for contrasted
                        remarkably.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="5"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                }}
              >
                <div className="image">
                  <a href="#popup-5" className="has-popup">
                    <img
                      src={slides[currentIndex].src}
                      className={`p-in-image-slide2 ${
                        count ? "p-in-slide-out" : "p-in-slide-in"
                      }`}
                      alt="slide"
                    />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-4" className="name has-popup">
                    NIKE
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="pricing">
                    <a href="javascript:void(0)">Rs.2000</a>
                    <del>Rs.2000</del>
                  </div>
                  <a href="javascript:void(0)" className="product-link">
                    https://www.troology.com/
                  </a>
                  <div className="service-bts">
                    <a href="#popup-4" className="btn btn_animated has-popup">
                      <span className="circle center_icon">View detail</span>
                    </a>
                    <a
                      href="#popup-4"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
                <div id="popup-4" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <div className="owl-carousel owl-theme owl-loaded owl-drag">
                        <div className="owl-stage-outer">
                          <div
                            className="owl-stage"
                            style={{
                              transform: "translate3d(0px, 0px, 0px)",
                              transition: "all",
                            }}
                          >
                            <div className="owl-item">
                              <div className="item">
                                <img src={img2} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="owl-nav disabled">
                          <button
                            type="button"
                            role="presentation"
                            className="owl-prev"
                          >
                            <span aria-label="Previous">‹</span>
                          </button>
                          <button
                            type="button"
                            role="presentation"
                            className="owl-next"
                          >
                            <span aria-label="Next">›</span>
                          </button>
                        </div>
                        <div className="owl-dots disabled"></div>
                      </div>
                    </div>
                    <div className="desc">
                      <h4>Nike</h4>
                      <p>
                        So striking at of to welcomed resolved. Northward by
                        described up household therefore attention. Excellence
                        decisively nay man yet impression for contrasted
                        remarkably.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="6"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                }}
              >
                <div className="image">
                  <a href="#popup-5" className="has-popup">
                    {/* <img src={slides3[currentIndex].src} className={count ? 'image-slide out' : 'image-slide'}alt="slide" /> */}
                    <img
                      src={slides3[currentIndex].src}
                      className={`p-in-image-slide ${
                        count ? "p-in-slide-out" : "p-in-slide-in"
                      }`}
                      alt="slide"
                    />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-4" className="name has-popup">
                    NIKE
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="pricing">
                    <a href="javascript:void(0)">Rs.2000</a>
                    <del>Rs.2000</del>
                  </div>
                  <a href="javascript:void(0)" className="product-link">
                    https://www.troology.com/
                  </a>
                  <div className="service-bts">
                    <a href="#popup-4" className="btn btn_animated has-popup">
                      <span className="circle center_icon">View detail</span>
                    </a>
                    <a
                      href="#popup-4"
                      className="btn extra contact-btn btn_animated has-popup"
                    >
                      <span className="circle center_icon">Enquiry</span>
                    </a>
                  </div>
                </div>
                <div id="popup-4" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <div className="owl-carousel owl-theme owl-loaded owl-drag">
                        <div className="owl-stage-outer">
                          <div
                            className="owl-stage"
                            style={{
                              transform: "translate3d(0px, 0px, 0px)",
                              transition: "all",
                            }}
                          >
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                            <div className="owl-item">
                              <div className="item">
                                <img src={img1} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="owl-nav disabled">
                          <button
                            type="button"
                            role="presentation"
                            className="owl-prev"
                          >
                            <span aria-label="Previous">‹</span>
                          </button>
                          <button
                            type="button"
                            role="presentation"
                            className="owl-next"
                          >
                            <span aria-label="Next">›</span>
                          </button>
                        </div>
                        <div className="owl-dots disabled"></div>
                      </div>
                    </div>
                    <div className="desc">
                      <h4>Nike</h4>
                      <p>
                        So striking at of to welcomed resolved. Northward by
                        described up household therefore attention. Excellence
                        decisively nay man yet impression for contrasted
                        remarkably.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </section>

          {/* <!-- Offers --> */}
          <section className="section works" id="Offers-section">
            <div className="title">Offers</div>
            <h4 className="Offers-content">Coming Soon</h4>
            <div className="clear"></div>
          </section>

          {/* <!-- Gallery --> */}
          <section className="section works" id="Gallery-section">
            <div className="title">Image Gallery</div>
            <div
              className="row box-items"
              style={{
                position: "relative",
                // height: '1555.5px'
              }}
            >
              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="7"
                style={{
                  visibility: "visible",
                  transform: "translateY(0px) scale(1)",
                  opacity: "1",
                  transition:
                    "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
                  left: "0%",
                  top: "0px",
                }}
              >
                <div className="image">
                  <a href="#popup-5" className="has-popup">
                    <img src={img3} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-5" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-5" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <img src={img3} alt="" />
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="8"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '508px'
                }}
              >
                <div className="image">
                  <a href="#popup-6" className="has-popup">
                    <img src={img3} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-6" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-6" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <img src={img3} alt="" />
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="9"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '1017px'
                }}
              >
                <div className="image">
                  <a href="#popup-7" className="has-popup">
                    <img src={img3} alt="" />
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-7" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-7" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <img src={img1} alt="" />
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- ---------video Gallery----------- --> */}

            <div className="title">Video Gallery</div>
            <div
              className="row box-items"
              style={{
                position: "relative",
                // height: '1044px'
              }}
            >
              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="10"
                style={{
                  visibility: "visible",
                  transform: "translateY(0px) scale(1)",
                  opacity: "1",
                  transition:
                    "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
                  left: "0%",
                  top: "0px",
                }}
              >
                <div className="image">
                  <a href="#popup-8" className="has-popup">
                    <iframe
                      className="vedioCard"
                      src="https://www.youtube.com/embed/k5E2AVpwsko"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen=""
                    ></iframe>
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-8" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-8" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <iframe
                        className="vedioCard"
                        height="323px"
                        src="https://www.youtube.com/embed/k5E2AVpwsko"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen=""
                      ></iframe>
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="11"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '338px'
                }}
              >
                <div className="image">
                  <a href="#popup-9" className="has-popup">
                    <iframe
                      className="vedioCard"
                      src="https://www.youtube.com/embed/k5E2AVpwsko"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen=""
                    ></iframe>
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-9" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-9" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <iframe
                        className="vedioCard"
                        src="https://www.youtube.com/embed/k5E2AVpwsko"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen=""
                      ></iframe>
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
                data-sr-id="12"
                style={{
                  visibility: "visible",
                  opacity: "1",
                  transitionBehavior: "normal, normal, normal",
                  transitionTimingFunction:
                    "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                  transitionDelay: "0s, 0s, 0s",
                  left: "0%",
                  // top: '676px'
                }}
              >
                <div className="image">
                  <a href="#popup-10" className="has-popup">
                    <iframe
                      className="vedioCard"
                      src="https://www.youtube.com/embed/k5E2AVpwsko"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen=""
                    ></iframe>
                  </a>
                </div>
                <div className="content-box">
                  <a href="#popup-10" className="name has-popup">
                    Magnet
                  </a>
                </div>
                <div id="popup-10" className="popup-box mfp-fade mfp-hide">
                  <div className="content">
                    <div className="image">
                      <iframe
                        className="vedioCard"
                        src="https://www.youtube.com/embed/k5E2AVpwsko"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen=""
                      ></iframe>
                    </div>
                    <div className="desc">
                      <h3 className="mr">Magnet</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- ---------Imp links----------- --> */}
            <div className="title">Important Links</div>
            <div
              className="row box-items"
              style={{
                position: "relative",
                height: "30px",
              }}
            >
              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={word} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 1
                    </a>
                  </div>
                </div>
              </div>

              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={ppt} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 2
                    </a>
                  </div>
                </div>
              </div>

              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={ppt} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 3
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row box-items"
              style={{
                position: "relative",
                height: "30px",
              }}
            >
              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={pdf} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 4
                    </a>
                  </div>
                </div>
              </div>

              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={csv} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 5
                    </a>
                  </div>
                </div>
              </div>

              <div className="col col-m-12 col-t-6 col-d-4 ">
                <div className="imp-link">
                  <div>
                    <img src={linkico} alt="" />
                    <a href="javascript:void(0)" target="_blank">
                      Link Name 6
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </section>

          {/* <!-- Section Testimonials --> */}
          <section className="section clients" id="clients-section">
            <div className="title">Testimonials</div>
            <div
              className="reviews-carousel animated"
              data-sr-id="13"
              style={{
                visibility: "visible",
                WebkitTransform: "translateY(0) scale(1)",
                transform: "translateY(0) scale(1)",
                opacity: "1",
                WebkitTransition:
                  "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                transition:
                  "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
              }}
            >
              <div
                className="owl-carousel owl-loaded owl-drag"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(-0px, 0px, 0px)",
                      transition: "0.25s",
                      // width: '1000px'
                    }}
                  >
                    <div className="owl-item cloned" style={{ width: "605px" }}>
                      <div className="item">
                        <div className="content-box">
                          <div className="reviews-item">
                            <div className="image">
                              <img src={profile} alt="" />
                   
                            </div>
                            <div className="name">
                              — {profileDetails?.name},{" "}
                              {profileDetails?.profession}
                            </div>
                            <p>
                              "Lorem ipsum dolor sit amet, consectetur
                              adipiscing elit. Morbi venenatis et tortor ac
                              tincidunt. In euismod iaculis lobortis. Vestibulum
                              posuere molestie ipsum vel. Vestibulum venenatis
                              vestibulum elit ultricies. Lorem ipsum dolor sit
                              amet, consectetur adipiscing elit. Morbi venenatis
                              et tortor ac tincidunt. In euismod iaculis
                              lobortis. Vestibulum posuere molestie ipsum vel."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="owl-nav disabled">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <span aria-label="Previous">‹</span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <span aria-label="Next">›</span>
                  </button>
                </div>
                <div className="owl-dots disabled"></div>
              </div>
            </div>
          </section>

          {/* <!-- Section Contacts --> */}
          <section className="section contacts" id="payments-section">
            <div className="title">Payments</div>
            <div className="row">
              <div className="col col-m-12 col-t-6 col-d-6">
                <div
                  className="content-box animated"
                  data-sr-id="14"
                  style={{
                    visibility: "visible",
                    transform: "translateY(0) scale(1)",
                    opacity: 1,
                    WebkitTransform: "translateY(0) scale(1)",
                    WebkitOpacity: 1,
                    transition:
                      "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                  }}
                >
                  <div className="info-list">
                    <ul>
                      <li>
                        <strong>
                          <span>Bank Name:</span>
                        </strong>{" "}
                        Bank of Maharashtra
                      </li>
                      <li>
                        <strong>
                          <span>Account Name:</span>
                        </strong>{" "}
                        {profileDetails?.name}
                      </li>
                      <li>
                        <strong>
                          <span>IFSC Code:</span>
                        </strong>
                        PUNB0733600
                      </li>
                      <li>
                        <strong>
                          <span>PAN Card No:</span>
                        </strong>
                        AAAAA7777A
                      </li>
                      <li>
                        <strong>
                          <span>Account Type:</span>
                        </strong>{" "}
                        Savings Account
                      </li>
                      <li>
                        <strong>
                          <span>Account No:</span>
                        </strong>
                        XXXXXXXXXX
                      </li>
                      <li>
                        <strong>
                          <span>GST No.:</span>
                        </strong>
                        07AAACP0165G2ZQ
                      </li>
                      <li>
                        <strong>
                          <span>Remark:</span>
                        </strong>
                        Is it possible to reverse funds transferred to the wrong
                        account.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col-m-12 col-t-6 col-d-6">
                <div
                  className="content-box animated upi-img"
                  data-sr-id="15"
                  style={{
                    visibility: "visible",
                    transform: "translateY(0) scale(1)",
                    opacity: 1,
                    WebkitTransform: "translateY(0) scale(1)",
                    WebkitOpacity: 1,
                    transition:
                      "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                    WebkitTransition:
                      "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                  }}
                >
                  <h5>UPI Image</h5>
                  <img src={qr} alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* footer */}
        <footer className="footerSec">
          <div className="bts">
            <a href="#popup-form" className="btn extra btn_animated has-popup">
              <span className="circle center_icon">
                <span
                  className="ink animate"
                  style={{
                    height: "155px",
                    width: "155px",
                    top: "-65.5px",
                    left: "73.8125px",
                  }}
                ></span>
                Refer Business
              </span>
            </a>

            <a
              href="javascript:void(0)"
              className="btn extra contact-btn btn_animated"
            >
              <span className="circle center_icon">
                <span
                  className="ink animate"
                  style={{
                    height: "107px",
                    width: "107px",
                    top: "-15.5px",
                    left: "-36.4219px",
                  }}
                ></span>
                Enquiry
              </span>
            </a>

            <a
              href="javascript:void(0)"
              className="btn extra contact-btn btn_animated"
            >
              <span className="circle center_icon">
                <span
                  className="ink animate"
                  style={{
                    height: "167px",
                    width: "167px",
                    top: "-80.5px",
                    left: "34.2188px",
                  }}
                ></span>
                Save My Contact
              </span>
            </a>
          </div>
        </footer>
      </div>

      {/* More content and sections... */}
      <button id="myBtn" onClick={myFunction}>
        see more
      </button>
      <span id="dots">...</span>
      <span id="more" style={{ display: "none" }}>
        More content here.
      </span>
    </div>
  );
};

export default ProfilepageUser;
