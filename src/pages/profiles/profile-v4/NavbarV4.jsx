
import React, { useContext, useState, useEffect } from "react";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import styles from "./styles/profileV4.module.css";
import { FaUserAlt } from "react-icons/fa";
import { resizeImage } from "@/pages/ProfilePages/resizeImage";

const NavbarV4 = ({name,profileImage}) => {
  const { setSelectedTab } = useContext(ContextAPI);
  const [active, setActive] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); // Reset menu state on desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectedTab = (key) => {
    setSelectedTab(key);
    setActive(key);
    if (isMobileOrTablet) {
      setIsMenuOpen(false); // Close menu after selection on mobile/tablet
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-0 rounded">
      <div className="container-fluid p-0">
        <div className={styles?.profileAndHamburger}>
          <div className={styles?.profileOnRes}    onClick={() => handleSelectedTab("about")}
             >
            <div style={{ }}>
              <img
                // style={{ borderRadius: "50%" }}
                // width="50px"
                // height="50px"
                className="rounded-circle"
                style={resizeImage(50,50)}
                src={profileImage}
                alt={name}
              />
            </div>
            <div className={`${styles.userName} text-secondary`}>
              {name}
            </div>
          </div>
          {isMobileOrTablet && (
            <div className={`flex ${styles.hamburgerOnMobile}`}>
              {/* <img
                className={styles.mobileQR}
                style={{ marginRight: "1rem" }}
                data-bs-toggle="modal"
                data-bs-target="#qrModal"
                height="40px"
                width="40px"
                src="/img/qr.png"
                alt=""
              /> */}
              <button
                className="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
                onClick={toggleMenu}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          )}
        </div>

        <div
          className={`${styles.ulChild} ${
            isMobileOrTablet 
              ? `navbar-collapse ${isMenuOpen ? 'show' : 'collapse'}`
              : 'navbar-collapse show'
          }`}
          id="navbarNav"
        >
          <ul
            className={` ${styles.ulNoneOnClickLi} navbar-nav col-md-8 `}
            style={{ alignItems: "center", fontWeight: "bold", ...(isMobileOrTablet && { top:'-1px ', marginTop:'0px ', paddingTop: 0 }), }}
          >
            {!isMobileOrTablet?
            <li
              className={`${styles.userIcon} nav-link active`}
              style={{
                borderRadius: "8px 0px 0px 8px",
                backgroundColor: "#425cbb",
                // color: active === "about" ? "#426cc5" : "" 
             
              }}
            >
              <a
                className="nav-link active"
                onClick={() => handleSelectedTab("about")}
              >
                <FaUserAlt
                  style={{
                    padding: "8px",
                    margin: "0px",
                    fontSize: "2.3rem",
                    color: "white",
                  }}
                />
              </a>
            </li>:
            <li style={{ paddingLeft: "10px" }}>
              <a
                className="nav-link"
                style={{ color: active === "about" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("about")}
              >
                About
              </a>
            </li>}
            <li style={{ paddingLeft: "10px" }}>
              <a
                className="nav-link"
                style={{ color: active === "services" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ color: active === "products" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("products")}
              >
                Products
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ color: active === "offers" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("offers")}
              >
                Offers
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ color: active === "gallery" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("gallery")}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ color: active === "testimonials" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("testimonials")}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ color: active === "payments" ? "#426cc5" : "" }}
                onClick={() => handleSelectedTab("payments")}
              >
                Payments
              </a>
            </li>
          </ul>
        </div>
        {!isMobileOrTablet && (
          <div className={styles.defaultQr}>
            {/* <img
              data-bs-toggle="modal"
              data-bs-target="#qrModal"
              height="50px"
              width="50px"
              src="/img/qr.png"
              alt=""
            /> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarV4;