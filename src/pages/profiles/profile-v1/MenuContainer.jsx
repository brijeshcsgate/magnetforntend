import React, { useContext, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa";
import { BsWechat } from "react-icons/bs";
import { TfiGallery } from "react-icons/tfi";
import { MdPayment } from "react-icons/md";
import styles from "./styles/profileV1.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import { scroller } from "react-scroll";

const MenuContainer = () => {
  const [active, setActive] = useState("profile");
  const { setSelectedV1MenuEle, setOpenFadeV1,openFadeV1 } =
    useContext(ContextAPI);

  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 100,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleSelectedTab = (key) => {
    setSelectedV1MenuEle(key);
    scrollToSection(key);
    setActive(key);
    setOpenFadeV1(!openFadeV1)
  };

 
  return (
    <div className={styles.manuItems}>
      <ul>
        <li className="active" onClick={() => handleSelectedTab("profile")}>
          <a style={{ color: `${active === "profile" ? "#78cc6d" : ""}` }}>
            <BiSolidUser fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "profile" ? "#78cc6d" : "gray"}` }}>
              PROFILE
            </div>
          </a>
        </li>
        <li onClick={() => handleSelectedTab("services")}>
          <a style={{ color: `${active === "services" ? "#78cc6d" : ""}` }}>
            <AiFillSetting fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "services" ? "#78cc6d" : "gray"}` }}>
              SERVICES
            </div>
          </a>
        </li>
        <li
          onClick={() => handleSelectedTab("products")}
          className={styles.productNavHideOnMobile}
        >
          <a style={{ color: `${active === "products" ? "#78cc6d" : ""}` }}>
            <FaLightbulb fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "products" ? "#78cc6d" : "gray"}` }}>
              PRODUCTS
            </div>
          </a>
        </li>
        <li onClick={() => handleSelectedTab("offers")}>
          <a style={{ color: `${active === "offers" ? "#78cc6d" : ""}` }}>
            <BiSolidUser fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "offers" ? "#78cc6d" : "gray"}` }}>
              OFFERS
            </div>
          </a>
        </li>
        <li onClick={() => handleSelectedTab("gallery")}>
          <a style={{ color: `${active === "gallery" ? "#78cc6d" : ""}` }}>
            <TfiGallery fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "gallery" ? "#78cc6d" : "gray"}` }}>
              GALLERY
            </div>
          </a>
        </li>
        <li
          onClick={() => handleSelectedTab("testimonials")}
          className={styles.testimonialsNavHideOnMobile}
        >
          <a style={{ color: `${active === "testimonials" ? "#78cc6d" : ""}` }}>
            <BsWechat fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "testimonials" ? "#78cc6d" : "gray"}` }}>
              TESTIMONIALS
            </div>
          </a>
        </li>
        <li onClick={() => handleSelectedTab("payments")}>
          <a style={{ color: `${active === "payments" ? "#78cc6d" : ""}` }}>
            <MdPayment fontSize={`20px`}/>
            <div className="link" style={{ color: `${active === "payments" ? "#78cc6d" : "gray"}` }}>
              PAYMENTS
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuContainer;
