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
import ProductModal from "../../../components/profile-v2/ProductModal";
const Services = lazy(() => import("./Services"));
const Products = lazy(() => import("./Products"));
const ProfileV2 = ({profileDetails,profileUserId,visitorInfo, name, whatsappNumber, email, companyName, designation, mobile}) => {
  
  return (
    <>
      <ServiceModal />
      <ProductModal/>
      <QrModal />
      <div className={`${styles.profile_container}`}>
        <Suspense>
          <Element name="profile">
            <Header profileImage={profileDetails?.profileImage} name={profileDetails?.name} message={profileDetails?.message} jobRoleName={profileDetails?.jobRoleName} 
            industryName={profileDetails?.industryName} orgLogo={profileDetails?.orgLogo} facebookLink={profileDetails?.facebookLink}
            instaLink={profileDetails?.instaLink} twitterLink={profileDetails?.twitterLink} linkedInLink={profileDetails?.linkedInLink}
            youtubeLink={profileDetails?.youtubeLink}
            Qr={profileDetails?.paymentDetails?.image}
            coverImage={profileDetails?.coverImage}
            profileUserId={profileUserId} visitorInfo={visitorInfo} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
                {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
            />
          </Element>

<Element>
<marquee width="100%" direction="left" behavior="scroll" scrollamount="4"className={`${styles.marquee}`}>
       <i>Meet</i> TROOLOGY TECHNOLOGIES  ✨ at GITEX GLOBAL 🚀 14-18 OCT 2024 ,DUBAI WORLD TRADE CENTER!
    </marquee>

</Element>
          {/* {JSON.stringify(profileDetails)} */}
          <Element name="about">
            <About aboutUs={profileDetails?.aboutUs}/>
          </Element>
          <Element name="contactme">
            <ContectMe countryCode={profileDetails?.countryCode} mobile={profileDetails?.mobile} whatsappNumberCountryCode={profileDetails?.whatsappNumberCountryCode} whatsappNumber={profileDetails?.whatsappNumber} 
            email={profileDetails?.email} address={profileDetails?.address}/>
          </Element>
          {(profileDetails?.serviceStatus === true) && (profileDetails?.services?.length > 0) ?
              
          <Element name="services">
            <Services  services={profileDetails?.services} profileUserId={profileUserId} visitorInfo={visitorInfo}/>
          </Element>:<></>}
          {(profileDetails?.productStatus === true) && (profileDetails?.products?.length > 0) ?
            
          <Element name="products">
            <Products products={profileDetails?.products} profileUserId={profileUserId} visitorInfo={visitorInfo}/>
          </Element>:<></>}
          {(profileDetails?.offerStatus === true) && (profileDetails?.offers?.length > 0) ?
              
          <Element name="offers">
            <Offers item={profileDetails?.offers}/>
          </Element>:<></>}
          {(profileDetails?.imageGalleryStatus === true) && (profileDetails?.imageGalleries?.length > 0) ?
                
          <Element name="imageGallery">
            <ImageGallery images={profileDetails?.imageGalleries}/>
          </Element>:<></>}
          {(profileDetails?.videoGalleryStatus === true) && (profileDetails?.videoGalleries?.length > 0) ?
                
          <Element name="videoGallery">
            <VideoGallery videos={profileDetails?.videoGalleries}/>
          </Element>
             : <></>}
              {(profileDetails?.linkStatus === true && (profileDetails?.documentsLinks?.length > 0)) ?
               
          <Element name="#">
            <ImportantLink documentsLinks={profileDetails?.documentsLinks}/>
          </Element>:<></>}
          {(profileDetails?.testimonialStatus === true) && (profileDetails?.testimonials?.length > 0) ?
             
          <Element name="testimonials">
            <Testimonials testimonials={profileDetails?.testimonials}/>
          </Element>:<></>}
          {(profileDetails?.bankAccountStatus === true) || (profileDetails?.bankAccountDetails?.length > 0) || (profileDetails?.ePaymentStatus === true) || (profileDetails?.paymentDetails?.length > 0) ?
             
          <Element name="payments">
            <Payments bankAccountDetails={profileDetails?.bankAccountDetails} paymentDetails={profileDetails?.paymentDetails}/>
          </Element>
          :<></>}
        </Suspense>
      </div>
    </>
  );
};

export default ProfileV2;
