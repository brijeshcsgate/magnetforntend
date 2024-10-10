
import React, { useEffect, useRef, useState } from "react";
import "../ProfilePageCss/basic.css";
import "../ProfilePageCss/layout.css";
import "../ProfilePageCss/ionicons.css";
import "../ProfilePageCss/owl-carousel.css";
import "../ProfilePageCss/magnific-popup.css";
import "../ProfilePageCss/custom.css";
import qr from "./Images/qr.png";
import img3 from "./Images/product.jpg";
import pdf from "./Images/pdf.png";
import word from "./Images/word.png";
import excel from "./Images/excel.png";
import csv from "./Images/csv.png";
import ppt from "./Images/powerpoint.png";
import linkico from "./Images/link_ico.png";
import bgimg from "./Images/slide-bg.jpg";
import "../ProfilePageCss/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { APIS } from "@/constants/api.constant";
import apiService, { axiosInstanceWapi } from "@/lib/apiService";
import TextToggler from "./TextToggler";
import { resizeImage } from "./resizeImage";
import { BanknoteIcon, HandCoins, HandHelpingIcon, HomeIcon, ImagesIcon, InboxIcon, LinkIcon, Mail, MailIcon, MessageCircleIcon, PhoneIcon, Pyramid, ShoppingBasketIcon, UserIcon } from "lucide-react";
import DrawerComponent from "@/components/common/Drawer/DrawerComponent";
import ImageCarousel from "./ImageCarousel";
import ServicesCarousel from "./ServicesCarousel";
import ProductCarousal from "./ProductCarousal";
import OffersCarousel from "./OffersCarousel";
import VideosCarousel from "./VideosCarousel";
import TestimonailCarousel from "./TestimonailCarousel";
import VistiorInfoForm from "./VistiorInfoForm";
import EnquiryInfoForm from "./EnquiryInfoForm";
import ReferrelInfoForm from "./ReferrelInfoForm";
import { Button } from "@mui/material";
import NoAccessibleProfile from "../NoAccessibleProfile/NoAccessibleProfile";
import { Helmet } from "react-helmet";
import VCardGenerator from "@/components/VCardGenerator/VCardGenerator";

const ProfilepageUser = () => {

  const items = [
    { name: 'Home', link: '#Home', icon: <HomeIcon /> },
    { name: 'Profile', link: '#Profile', icon: <UserIcon /> },
    { name: 'Services', link: '#Services', icon: <HandHelpingIcon /> },
    { name: 'Products', link: '#Products', icon: <ShoppingBasketIcon /> },
    { name: 'Offers', link: '#Offers', icon: <HandCoins /> },
    { name: 'Gallery', link: '#Gallery', icon: <ImagesIcon /> },
    { name: 'Testimonials', link: '#Testimonials', icon: <Pyramid /> },

    { name: 'Payments', link: '#Testimonials', icon: <BanknoteIcon /> },
  ];
  const sectionRefs = {
    Home: useRef(null),
    Profile: useRef(null),
    Services: useRef(null),
    Products: useRef(null),
    Offers: useRef(null),
    Gallery: useRef(null),
    Testimonials: useRef(null),
    Payments: useRef(null),

  };

  const [profiles, setProfiles] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to determine device type based on width
  const getDeviceType = () => {
    if (width < 768) return 120;
    if (width < 1024) return 170;
    return 280;
  };

  // Auto-increment count to cycle through profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % profiles.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [profiles]);

  const [count, setCount] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the text view
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCount(true);
    setTimeout(() => {

      setCount(false);
    }, 500); // Delay for animation
  };

  const [profileDetails, setProfileDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [visitorInfoType, setVisitorInfoType] = useState('')

  const [visitorInfo, setVisitorInfo] = useState('')
  const [profileUserId, setProfileUserId] = useState('')
  const [handleSection, setHandleSection] = useState('')
  const [profileStatus, setProfileStatus] = useState(true)
  const { id } = useParams(); // Access the id from URL
  let profileId = id;

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const topOffset = document.getElementById("profileName").offsetTop;
      const scrollPosition = window.scrollY;
      if (scrollPosition > getDeviceType()) {
        setIsSticky(true);

      } else {
        setIsSticky(false);

      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await apiService.get(`${APIS.GET_ENQUIRY}/${id}`);
        const response = await apiService.get(`${APIS.PROFILE_IDENT}/${id}`);
        setProfileStatus(response?.data?.profileStatus)
        setProfileUserId(response.data._id)
        setProfileDetails(response.data);
        setProfiles(response.data.testimonials);
        setVisitorInfoType(response.data.vistor_info_type)

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
    <>
      {profileStatus === true ?
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
          <VistiorInfoForm openP={visitorInfoType != 'Not Required' ? true : false} visitorInfoType={visitorInfoType} profileUserId={profileUserId} setVisitorInfo={setVisitorInfo} />

          <div className="started-bg">
            <div
              className="slide"

              style={{ backgroundImage: `url(${profileDetails?.coverImage})` }}
            ></div>
          </div>
          {/* Header */}
          <header>
          </header>

          {/* <!-- Header --> */}
          <header>
            <div className="top-menu">




              <DrawerComponent title="Open Drawer" items={items} scrollToSection={profileDetails?.scrollToSection} sectionRefs={profileDetails?.sectionRefs} handleSection={(e) => setHandleSection(e)} serviceStatus={profileDetails?.serviceStatus} productStatus={profileDetails?.productStatus} testimonialStatus={profileDetails?.testimonialStatus} offerStatus={profileDetails?.offerStatus} imageGalleryStatus={profileDetails?.imageGalleryStatus} videoGalleryStatus={profileDetails?.videoGalleryStatus} linkStatus={profileDetails?.linkStatus} bankAccountStatus={profileDetails?.bankAccountStatus} ePaymentStatus={profileDetails?.ePaymentStatus} />
            </div>
          </header>
          {/* <!-- Container --> */}

          <div className="container margin-bottom" >
            {/* <!-- Started --> */}
            <section className="section started" ref={sectionRefs.Home}>
              <div className="st-box pt-4">
                <div className="st-bts">
                  <a className="has-popup">
                    {profileDetails?.paymentDetails?.image ?
                      <img src={profileDetails?.paymentDetails?.image} style={resizeImage(150, 150)} alt="" />
                      : <></>}
                  </a>
                </div>
                <div
                  className={`st-image  ${isSticky ? "sticky" : ""}`}
                  id="profileName"
                >
                  <img src={profileDetails?.profileImage} alt="" />
                  <div className="st-title">{profileDetails?.name}</div>
                </div>
                <div className="profile-quote">
                  {profileDetails?.message}
                </div>
                <div className="st-title">{profileDetails?.name}</div>
                <div className="st-subtitle">
                  {profileDetails?.jobRoleName}
                </div>
                <div className="life-ins">{profileDetails?.industryName}
                </div>
                <div className="center_icon">
                  <img
                    style={resizeImage(80, 41)}
                    src={profileDetails?.orgLogo}
                    className="liclogo" />
                </div>
                <br />
                <div className="st-soc">

                  {profileDetails?.facebookLink ?
                    <a
                      target="blank"
                      href={profileDetails?.facebookLink}
                      className="btn_animated"
                    >
                      <span className="circle center_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M8.5 13.478a5.5 5.5 0 1 0-1.5-.069V9.75H5.75a.75.75 0 0 1 0-1.5H7V7.24c0-.884.262-1.568.722-2.032S8.843 4.5 9.644 4.5c.273 0 .612.04.948.213a.75.75 0 0 1-.685 1.334A.6.6 0 0 0 9.644 6c-.493 0-.737.144-.857.265c-.12.12-.287.39-.287.975v1.01h1.25a.75.75 0 0 1 0 1.5H8.5zM8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg>
                      </span>
                    </a> : <></>}

                  {/* facebook */}
                  {profileDetails?.instaLink ?
                    <a
                      target="blank"
                      href={profileDetails?.instaLink}
                      className="btn_animated"
                    >
                      <span className="circle center_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="#fff"><path fill-rule="evenodd" d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-3 5a3 3 0 1 0 6 0a3 3 0 0 0-6 0" clip-rule="evenodd" /><path d="M18 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2" /><path fill-rule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm14 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" clip-rule="evenodd" /></g></svg>
                      </span>
                    </a> : <></>}
                  {/* twiter */}
                  {profileDetails?.twitterLink ?
                    <a
                      target="blank"
                      href={profileDetails?.twitterLink}
                      className="btn_animated"
                    >
                      <span className="circle center_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 18.5C3.765 19.521 5.814 20 8 20c6.48 0 11.762-5.137 11.992-11.562L22 4.5l-3.354.5A4 4 0 0 0 16 4c-2.572 0-4.5 2.517-3.88 4.98c-3.552.23-6.771-1.959-8.633-4.875c-1.236 4.197-.09 9.251 3.013 12.366c0 1.176-3 1.878-4.5 2.029" color="#fff" /></svg>
                      </span>
                    </a> : <></>}
                  {/* insta */}



                  {profileDetails?.linkedInLink ?
                    <a
                      target="blank"
                      href={profileDetails?.linkedInLink}
                      className="btn_animated"
                    >
                      <span className="circle center_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-2 -2 24 24"><g fill="#fff"><path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457c-.592 0-.945.398-1.1.784c-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066c1.41 0 2.468.922 2.468 2.902M6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115c-.014-.632-.465-1.114-1.199-1.114m-1.086 9.556h2.144V8.38H5.127z" /><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4" /></g></svg> </span>
                    </a> : <></>}
                  {/* youtube */}
                  {profileDetails?.youtubeLink ?
                    <a
                      target="blank"
                      href={profileDetails?.youtubeLink}
                      className="btn_animated"
                    >
                      <span className="circle center_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="#fff" d="M960 509.2c0-2.2 0-4.7-.1-7.6c-.1-8.1-.3-17.2-.5-26.9c-.8-27.9-2.2-55.7-4.4-81.9c-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 0 0-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2c-37.1-1.4-76.8-2.3-116.5-2.8c-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4c-39.7.5-79.4 1.4-116.5 2.8c-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0 0 82.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9c-.3 9.7-.4 18.8-.5 26.9c0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6c.1 8.1.3 17.2.5 26.9c.8 27.9 2.2 55.7 4.4 81.9c3 36.1 7.4 66.2 13.4 88.8c12.8 47.9 50.4 85.7 98.3 98.5c28.2 7.6 83.7 12.3 161.7 15.2c37.1 1.4 76.8 2.3 116.5 2.8c13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4c39.7-.5 79.4-1.4 116.5-2.8c78-3 133.5-7.7 161.7-15.2c47.9-12.8 85.5-50.5 98.3-98.5c6.1-22.6 10.4-52.7 13.4-88.8c2.2-26.2 3.6-54 4.4-81.9c.3-9.7.4-18.8.5-26.9c0-2.9.1-5.4.1-7.6zm-72 5.2c0 2.1 0 4.4-.1 7.1c-.1 7.8-.3 16.4-.5 25.7c-.7 26.6-2.1 53.2-4.2 77.9c-2.7 32.2-6.5 58.6-11.2 76.3c-6.2 23.1-24.4 41.4-47.4 47.5c-21 5.6-73.9 10.1-145.8 12.8c-36.4 1.4-75.6 2.3-114.7 2.8c-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8c-71.9-2.8-124.9-7.2-145.8-12.8c-23-6.2-41.2-24.4-47.4-47.5c-4.7-17.7-8.5-44.1-11.2-76.3c-2.1-24.7-3.4-51.3-4.2-77.9c-.3-9.3-.4-18-.5-25.7c0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1c.1-7.8.3-16.4.5-25.7c.7-26.6 2.1-53.2 4.2-77.9c2.7-32.2 6.5-58.6 11.2-76.3c6.2-23.1 24.4-41.4 47.4-47.5c21-5.6 73.9-10.1 145.8-12.8c36.4-1.4 75.6-2.3 114.7-2.8c13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8c71.9 2.8 124.9 7.2 145.8 12.8c23 6.2 41.2 24.4 47.4 47.5c4.7 17.7 8.5 44.1 11.2 76.3c2.1 24.7 3.4 51.3 4.2 77.9c.3 9.3.4 18 .5 25.7c0 2.7.1 5.1.1 7.1zM423 646l232-135l-232-133z" /></svg>
                      </span>
                    </a> : <></>}
                  {/* <a
                    target="blank"
                    href={profileDetails?.twitterLink}
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
                  </a> */}
                </div>
              </div>
            </section>
            {/* <!-- Wrapper --> */}
            <div className="wrapper">
              {/* <!-- Section About --> */}
              <section className="section about" ref={sectionRefs.Profile}>
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
                            <a href={`tel:+${profileDetails?.countryCode}) ${profileDetails?.mobile}`} target="_blank">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <span>
                                (+{profileDetails?.countryCode}) {profileDetails?.mobile}</span>
                                <PhoneIcon size={20} />
                              </span></a>

                          </li>
                          <li>
                            <strong>
                              <span>WhatsApp No:</span>
                            </strong>{" "}
                            <a href={`https://wa.me/${profileDetails?.whatsappNumber}`} target="_blank">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <span>

                                (+{profileDetails?.whatsappNumberCountryCode}) {profileDetails?.whatsappNumber}</span>
                                <MessageCircleIcon size={20} />
                              </span></a>
                          </li>
                          <li>
                            <strong>

                              <span>Email address:</span>
                            </strong>{" "}
                            <a href={`mailto:${profileDetails?.email}`} target="_blank">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <span>

                                {profileDetails?.email}</span>
                                <Mail size={20} />
                              </span></a>

                          </li>
                          {/* <li>
                            <strong>
                              <span>Website:</span>
                            </strong>{" "}
                            www.magnet.cards--?
                          </li>
                          <li>
                            <strong>
                              <span>Telegram:</span>
                            </strong>
                            @gyangps--?
                          </li> */}
                          <li>
                            <strong>
                              <span>Address:</span>
                            </strong>
                            {profileDetails?.address}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col col-m-12 col-t-7 col-d-7">
                      <div className="text-box">
                        <div className="contact-title">About Me</div>
                        <p>

                          {isExpanded ? profileDetails?.aboutUs : profileDetails?.aboutUs?.slice(0, 200)}...
                          {profileDetails?.aboutUs?.length >= 200 ?
                            <span onClick={toggleText} id="myBtn">
                              {isExpanded ? "show Less" : "see More"}
                            </span> : <></>
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* <!-- Services --> */}
              {(profileDetails?.serviceStatus === true) && (profileDetails?.services?.length > 0) ?
                <section className="section works" id="works-section" ref={sectionRefs.Services}>
                  <div className="title">Services</div>

                  <div
                    className="row box-items"
                    style={{
                      position: "relative",
                    }}
                  >

                    <ServicesCarousel images={profileDetails.services} footer={true} profileUserId={profileUserId} visitorInfo={visitorInfo} />
                  </div>
                  <div className="clear"></div>
                </section> : <></>
              }
              {/* <!-- Products --> */}
              {(profileDetails?.productStatus === true) && (profileDetails?.products?.length > 0) ?
                <section className="section works" id="Products-section" ref={sectionRefs.Products}>
                  <div className="title">Products</div>

                  <div
                    className="row box-items"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div className="row">

                      <ProductCarousal images={profileDetails?.products} footer={true} profileUserId={profileUserId} visitorInfo={visitorInfo} />
                    </div>
                  </div>
                  <div className="clear"></div>
                </section> : <></>}

              {/* <!-- Offers --> */}
              {(profileDetails?.offerStatus === true) && (profileDetails?.offers?.length > 0) ?
                <section className="section works" id="Offers-section" ref={sectionRefs.Offers}>
                  <div className="title">Offers</div>

                  <div
                    className="row box-items"
                    style={{
                      position: "relative",
                    }}
                  >



                    <div className="row">
                      <OffersCarousel offers={profileDetails?.offers} />
                    </div>




                  </div>
                  <div className="clear"></div>
                </section> : <></>
              }
              {/* <!-- Gallery --> */}
              <section className="section works" id="Gallery-section" ref={sectionRefs.Gallery}>
                {(profileDetails?.imageGalleryStatus === true) && (profileDetails?.imageGalleries?.length > 0) ?
                  <>
                    <div className="title">Image Gallery</div>
                    <div
                      className="row box-items"
                      style={{
                        position: "relative",
                      }}
                    >

                      <ImageCarousel images={profileDetails?.imageGalleries} />
                    </div>
                  </> : <></>}


                {/* <!-- ---------video Gallery----------- --> */}

                {(profileDetails?.videoGalleryStatus === true) && (profileDetails?.videoGalleries?.length > 0) ?
                  <>
                    <div className="title">Video Gallery</div>
                    <div
                      className="row box-items"
                      style={{
                        position: "relative",
                      }}
                    >
                      <VideosCarousel videos={profileDetails?.videoGalleries} />
                    </div>
                  </> : <></>}
                {/* <!-- ---------Imp links----------- --> */}
                {(profileDetails?.linkStatus === true && (profileDetails?.documentsLinks?.length > 0)) ?
                  <>
                    <div className="title">Important Links</div>
                    <div
                      className="row box-items"
                      style={{
                        position: "relative",
                        height: "30px",
                      }}
                    >

                      {profileDetails?.documentsLinks?.map((link, index) => (
                        <div key={index} className="col col-m-12 col-t-6 col-d-4">
                          <div className="imp-link">
                            <div className="center-align-contents">
                              <LinkIcon />
                              {/* <img src={link?.fileType === ppt ? link?.fileType : word} alt={link?.name} /> */}
                              <a
                                href={link?.fileType?.startsWith('http') ? link.fileType : `https://${link.fileType}`}
                                className="pl-2"
                              >
                                {link?.name}
                              </a>

                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </> : <></>}
                <div className="clear"></div>
              </section>

              {/* <!-- Section Testimonials --> */}

              {(profileDetails?.testimonialStatus === true) && (profileDetails?.testimonials?.length > 0) ?
                <section className="section clients" id="clients-section" ref={sectionRefs.Testimonials}>
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
                      <div className="wd-100"

                      >


                        <TestimonailCarousel testimonials={profileDetails.testimonials} />
                      </div>

                    </div>
                  </div>
                </section> : <></>}

              {/* <!-- Section Contacts --> */}
              {(profileDetails?.bankAccountStatus === true) || (profileDetails?.bankAccountDetails?.length > 0) || (profileDetails?.ePaymentStatus === true) || (profileDetails?.paymentDetails?.length > 0) ?
                <section className="section contacts " id="payments-section" ref={sectionRefs.Payments} >
                  <div className="title">Payments</div>

                  <div className="row">
                    {(profileDetails?.bankAccountStatus === true) && ([profileDetails?.bankAccountDetails].length > 0) ?
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
                                {profileDetails?.bankAccountDetails?.bankName}
                              </li>
                              <li>
                                <strong>
                                  <span>Account Name:</span>
                                </strong>{" "}
                                {profileDetails?.bankAccountDetails?.accountName}
                              </li>
                              <li>
                                <strong>
                                  <span>IFSC Code:</span>
                                </strong>
                                {profileDetails?.bankAccountDetails?.ifsc}

                              </li>
                              <li>
                                <strong>
                                  <span>PAN Card No:</span>
                                </strong>

                                {profileDetails?.bankAccountDetails?.pan}
                              </li>
                              {/* <li>
                                <strong>
                                  <span>Account Type:</span>
                                </strong>{" "}
                                {profileDetails?.bankAccountDetails?.ifsc}--pend
                              </li> */}
                              <li>
                                <strong>
                                  <span>Account No:</span>
                                </strong>

                                {profileDetails?.bankAccountDetails?.accountNumber}
                              </li>
                              <li>
                                <strong>
                                  <span>GST No.:</span>
                                </strong>
                                {profileDetails?.bankAccountDetails?.gst}
                              </li>
                              <li>
                                <strong>
                                  <span>Remark:</span>
                                </strong>

                                {profileDetails?.bankAccountDetails?.remark}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> : <></>}
                    {(profileDetails?.ePaymentStatus === true) && ([profileDetails?.paymentDetails].length > 0) ?
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
                          <img src={profileDetails?.paymentDetails?.image} style={resizeImage(150, 150)} alt="" />
                          <p>Upi ID: {profileDetails?.paymentDetails?.upiId}</p>

                          <p>Payment Gateway Link:
                            {/* <a href={profileDetails?.paymentDetails?.paymentGatewayLink} target="_blank"> Click here to open
                            </a> */}
                            &nbsp;&nbsp;
                            <Button variant="contained" size='small' color="success" onClick={(e) => { window.open(profileDetails?.paymentDetails?.paymentGatewayLink, '_blank') }}>
                              Click Here
                            </Button>

                          </p>


                        </div>
                      </div> : <></>}
                  </div>
                </section> : <></>
              }
            </div>
            {/* footer */}
          </div>
          <footer className="footerSec">
            <div className="bts">

              <ReferrelInfoForm footer={true} profileUserId={profileUserId} visitorInfo={visitorInfo} />

              <EnquiryInfoForm footer={true} profileUserId={profileUserId} visitorInfo={visitorInfo} />

              {/* <Button
                className="btn extra contact-btn btn_animated"
              >
                <span className="circle center_icon line-height">
                  <span
                    className="ink animate "
                  ></span>
                  Save Contact
                </span>
              </Button> */}



              <VCardGenerator name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
                {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile} />

            </div>
          </footer>

        </div>
        :
        <NoAccessibleProfile />
      }
    </>
  );
};

export default ProfilepageUser;
