import React, {
  useContext,
  useLayoutEffect,
  useState,
  lazy,
  Suspense,
} from "react";
import { Element } from "react-scroll";
// import Service from "./Service";
// import Products from "./Products";

import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import AboutAndContact from "./AboutAndContact";
import Testimonials from "./Testimonials";
import styles from "./styles/profileV1.module.css";
import Gallery from "./Gallery";
import Offers from "./Offers";
import Payments from "./Payments";

import "./styles/fadeEffect.css";

const Service = lazy(() => import("./Service"));
const Products = lazy(() => import("./Products"));
const ContentContainer = () => {
  const { selectedV1MenuEle } = useContext(ContextAPI);

  const [currentData, setCurrentData] = useState(null);

  useLayoutEffect(() => {
    setCurrentData(selectedV1MenuEle);
  }, [selectedV1MenuEle]);

  return (
    <>
      <div className={`${styles.AllContentContainerContext}`}>
        <Suspense>
          <div className="fade-transition-container">
            {selectedV1MenuEle === "profile" && (
              <div className="content-section">
                <AboutAndContact />
              </div>
            )}
            {selectedV1MenuEle === "services" && (
              <div className="content-section">
                <Service />
              </div>
            )}
            {selectedV1MenuEle === "gallery" && (
              <div className="content-section">
                <Gallery />
              </div>
            )}
            {selectedV1MenuEle === "offers" && (
              <div className="content-section">
                <Offers />
              </div>
            )}
            {selectedV1MenuEle === "testimonials" && (
              <div className="content-section">
                <Testimonials />
              </div>
            )}
            {selectedV1MenuEle === "products" && (
              <div className="content-section">
                <Products />
              </div>
            )}
            {selectedV1MenuEle === "payments" && (
              <div className="content-section">
                <Payments />
              </div>
            )}
          </div>
        </Suspense>
      </div>

      <div className={styles.allContentResponsive}>
        <Suspense>
          <Element name="profile">
            <div className={styles.resAbout}>
              <AboutAndContact />
            </div>
          </Element>
          <Element name="services">
            <div className={styles.resService}>
              <Service />
            </div>
          </Element>

          <Element name="gallery">
            <div className={styles.resGallery}>
              <Gallery />
            </div>
          </Element>
          <Element name="offers">
            <div className={styles.resOffers}>
              <Offers />
            </div>
          </Element>
          <Element name="testimonials">
            <div className={styles.resTestimonials}>
              <Testimonials />
            </div>
          </Element>
          <Element name="products">
            <div className={styles.resProducts}>
              <Products />
            </div>
          </Element>
          <Element name="payments">
            <div className={styles.resPayments}>
              <Payments />
            </div>
          </Element>
        </Suspense>
      </div>
    </>
  );
};

export default ContentContainer;
