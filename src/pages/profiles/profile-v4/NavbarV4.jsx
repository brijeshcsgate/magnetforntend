import React, { useContext, useState } from "react";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import styles from "./styles/profileV4.module.css";
import { FaUserAlt } from "react-icons/fa";
const NavbarV4 = () => {
  const { setSelectedTab } = useContext(ContextAPI);
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleSelectedTab = (key) => {
    setSelectedTab(key);
    setActive(key);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-0 rounded">
      <div className="container-fluid p-0">
        <div className={styles?.profileAndHamburger}>
          <div className={styles?.profileOnRes}>
            <div style={{ with: "40px", height: "40px", borderRadius: "50%" }}>
              <img
                style={{ borderRadius: "50%" }}
                width="100%"
                height="100%"
                src={"/imgV4/profile-img.jpg"}
                alt="Shahista-profile"
              />
            </div>
            <div
              className={`${styles.userName} text-secondary`}
            >{`Shahista Naaz`}</div>
          </div>
          <div className={styles.hamburgerOnMobile}>
            <img
              className={styles.mobileQR}
              style={{ marginRight: "1rem" }}
              data-bs-toggle="modal"
              data-bs-target="#qrModal"
              height={"40px"}
              src={`${"/img/qr.png"}`}
              alt=""
            />
            <button
              className="navbar-toggler"
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
          </div>
        </div>
        <div
          className={`${styles.ulChild} collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul
            className={`${styles.ulNoneOnClickLi} navbar-nav col-md-8`}
            style={{ alignItems: "center", fontWeight: "bold" }}
          >
            <li
              className={`${styles.userIcon} nav-link`}
              style={{
                borderRadius: "8px 0px 0px 8px",
                backgroundColor: "#425cbb",
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
            </li>
            <li style={{ paddingLeft: "10px" }}>
              <a
                className={`nav-link`}
                style={{ color: `${active === "services" ? "#426cc5" : ""}` }}
                onClick={() => handleSelectedTab("services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                className={` nav-link`}
                style={{ color: `${active === "products" ? "#426cc5" : ""}` }}
                onClick={() => handleSelectedTab("products")}
              >
                Products
              </a>
            </li>
            <li>
              <a
                className={` nav-link`}
                style={{ color: `${active === "offers" ? "#426cc5" : ""}` }}
                onClick={() => handleSelectedTab("offers")}
              >
                Offers
              </a>
            </li>
            <li>
              <a
                className={` nav-link`}
                style={{ color: `${active === "gallery" ? "#426cc5" : ""}` }}
                onClick={() => handleSelectedTab("gallery")}
              >
                Gallery
              </a>
            </li>

            <li>
              <a
                className={` nav-link`}
                style={{
                  color: `${active === "testimonials" ? "#426cc5" : ""}`,
                }}
                onClick={() => handleSelectedTab("testimonials")}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                className={` nav-link`}
                style={{ color: `${active === "payments" ? "#426cc5" : ""}` }}
                onClick={() => handleSelectedTab("payments")}
              >
                Payments
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.defaultQr}`}>
          <img
            data-bs-toggle="modal"
            data-bs-target="#qrModal"
            height={"50px"}
            src={`${"/img/qr.png"}`}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarV4;
