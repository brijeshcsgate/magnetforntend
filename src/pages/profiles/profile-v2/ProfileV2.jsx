import React, { lazy, Suspense } from "react";
import Header from "./Header";
import styles from "./styles/profileV2.module.css";
import About from "./About";

// import Services from './Services'
// import Products from "./Products";

import ImageGallery from "./ImageGallery";
import ServiceModal from "../../../components/profile-v2/ServiceModal";
import VideoGallery from "./VideoGallery";
import Testimonials from "./Testimonials";
import Payments from "./Payments";
import ContectMe from "./ContectMe";
import QrModal from "../../../components/profile-v2/QrModal";
import { Element } from "react-scroll";
import Offers from "./Offers";
import ImportantLink from "./ImportantLink";
const Services = lazy(() => import("./Services"));
const Products = lazy(() => import("./Products"));
const ProfileV2 = () => {
  return (
    <>
      <ServiceModal />
      <QrModal />
      <div className={`${styles.profile_container}`}>
        <Suspense>
          <Element name="profile">
            <Header />
          </Element>
          <Element name="about">
            <About />
          </Element>
          <Element name="contactme">
            <ContectMe />
          </Element>
          <Element name="services">
            <Services />
          </Element>
          <Element name="products">
            <Products />
          </Element>
          <Element name="offers">
            <Offers />
          </Element>
          <Element name="imageGallery">
            <ImageGallery />
          </Element>
          <Element name="videoGallery">
            <VideoGallery />
          </Element>
          <Element name="#">
            <ImportantLink />
          </Element>
          <Element name="testimonials">
            <Testimonials />
          </Element>
          <Element name="payments">
            <Payments />
          </Element>
        </Suspense>
      </div>
    </>
  );
};

export default ProfileV2;
