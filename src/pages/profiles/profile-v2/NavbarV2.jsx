import React, { useContext, useState } from "react";
import "./styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
const NavbarV2 = () => {
  const { isScrolled, choosenColor, setIsScrolled } = useContext(ContextAPI);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 100,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const changeNavOnScroll = () => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavOnScroll);

  return (
    <nav
      className={`fixed navContainer CustomNavbar navbar navbar-expand-lg`}
      style={{
        backgroundColor: `${
          isScrolled && choosenColor
            ? choosenColor
            : isScrolled
            ? "#6d56c1"
            : ""
        }`,
      }}
    >
      <div className={`container-fluid navbarChild`}>
        <div className="profileShowOnDefault">
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="profileShowOnResponsive ">
            <div className="text-white">{`SHAHISTA NAAZ`}</div>
            <div className="imgCircle">
              <img
                width={`100%`}
                height={`100%`}
                style={{ borderRadius: "50%" }}
                src={`${"/img/profile.jpg"}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          className={`collapse ulSectionOnClickHumberger navbar-collapse ${
            isMenuOpen ? "show" : ""
          }`}
          style={{ backgroundColor: "" }}
          id="navbarNav"
        >
          <ul className="navbar-nav w-100 responsiveNav">
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("profile")}
                to={`#`}
                className="nav-link active link text-white fw-bold"
                style={{ fontSize: "15px" }}
                aria-current="page"
              >
                PROFILE
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("services")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                SERVICES
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("products")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                PRODUCTS
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("offers")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                OFFERS
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("imageGallery")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                GALLERY
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("testimonials")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                TESTIMONIALS
              </div>
            </li>
            <li className="nav-item" onClick={closeMenu}>
              <div
                onClick={() => scrollToSection("payments")}
                className="nav-link link text-white fw-bold"
                style={{ fontSize: "15px" }}
              >
                PAYMENTS
              </div>
            </li>
          </ul>
          <div
            className="profile"
            style={{ display: `${!isScrolled ? "none" : ""}` }}
          >
            <div
              className="text-dark text-white fw-bold"
              style={{ fontSize: "15px" }}
            >{`SHAHISTA NAAZ`}</div>
            <div className="imgCircle">
              <img
                width={`100%`}
                height={`100%`}
                style={{ borderRadius: "50%" }}
                src={`${"/img/profile.jpg"}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarV2;
