import React, { useEffect, useRef, useState } from "react";
import './fbstyle.css'
import { Element } from "react-scroll";
import { useParams } from "react-router-dom";
import { APIS } from "@/constants/api.constant";
import apiService, { axiosInstanceWapi } from "@/lib/apiService";
import FBHeader from "./FBHeader";
import FBAbout from "./FBAbout";
import FBService from "./FBService";
import FBProduct from "./FBProduct";
import FBImage from "./FBImage";
import FBVideo from "./FBVideo";
import FBLinks from "./FBLinks";
import FBTestimonial from "./FBTestimonial";
import FBPayment from "./FBPayment";
import FBFooter from "./FBFooter";
import FBAccessibility from "./FBAccessibility";
import ServiceModal from "@/components/profile-v1/ServiceModal";
import ProductModal from "@/components/profile-v2/ProductModal";
import FBOffers from "./FBOffers";
import VistiorInfoForm from "@/pages/ProfilePages/VistiorInfoForm";
import NoAccessibleProfile from "@/pages/NoAccessibleProfile/NoAccessibleProfile";
const FBIndex = () => {


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
      {profileStatus === true ? <>
        <VistiorInfoForm openP={visitorInfoType != 'Not Required' ? true : false} visitorInfoType={visitorInfoType} profileUserId={profileUserId} setVisitorInfo={setVisitorInfo} />

        <ServiceModal />
        <ProductModal />

        <Element name="profile" id="profile" className="scroll-element-head">
          <FBHeader profileImage={profileDetails?.profileImage} name={profileDetails?.name} message={profileDetails?.message} jobRoleName={profileDetails?.jobRoleName}
            industryName={profileDetails?.industryName} orgLogo={profileDetails?.orgLogo} facebookLink={profileDetails?.facebookLink}
            instaLink={profileDetails?.instaLink} twitterLink={profileDetails?.twitterLink} linkedInLink={profileDetails?.linkedInLink}
            youtubeLink={profileDetails?.youtubeLink}
            Qr={profileDetails?.paymentDetails?.image}
            coverImage={profileDetails?.coverImage}
            profileUserId={profileUserId} visitorInfo={visitorInfo} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
            {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
          />

        </Element>
        <Element name="about" id="about" className="scroll-element-head">
          <FBAbout aboutUs={profileDetails?.aboutUs} countryCode={profileDetails?.countryCode} mobile={profileDetails?.mobile} whatsappNumberCountryCode={profileDetails?.whatsappNumberCountryCode} whatsappNumber={profileDetails?.whatsappNumber}
            email={profileDetails?.email} address={profileDetails?.address} />
        </Element>
        {(profileDetails?.serviceStatus === true) && (profileDetails?.services?.length > 0) ?
          <Element name="services" id="services" className="scroll-element-head">

            <FBService services={profileDetails?.services} profileUserId={profileUserId} visitorInfo={visitorInfo} />
          </Element> : <></>}
        {(profileDetails?.productStatus === true) && (profileDetails?.products?.length > 0) ?
          <Element name="products" id="products" className="scroll-element-head">
            <FBProduct products={profileDetails?.products} profileUserId={profileUserId} visitorInfo={visitorInfo} />
          </Element> : <></>}
        {(profileDetails?.offerStatus === true) && (profileDetails?.offers?.length > 0) ?
          <Element name="offers" id="offers" className="scroll-element-head">
            <FBOffers item={profileDetails?.offers} profileUserId={profileUserId} visitorInfo={visitorInfo} />
          </Element>
          : <></>}
        {(profileDetails?.imageGalleryStatus === true) && (profileDetails?.imageGalleries?.length > 0) ?
          <Element name="imageGallery" id="imageGallery" className="scroll-element-head">

            <FBImage images={profileDetails?.imageGalleries} /></Element>
          : <></>}
        {(profileDetails?.videoGalleryStatus === true) && (profileDetails?.videoGalleries?.length > 0) ?
          <Element name="videoGallery" id="videoGallery" className="scroll-element-head">
            <FBVideo videos={profileDetails?.videoGalleries} />
          </Element>
          : <></>}
        {(profileDetails?.linkStatus === true && (profileDetails?.documentsLinks?.length > 0)) ?
          <Element name="#links" id="#links" className="scroll-element-head">
            <FBLinks documentsLinks={profileDetails?.documentsLinks} />
          </Element>
          : <></>}
        {(profileDetails?.testimonialStatus === true) && (profileDetails?.testimonials?.length > 0) ?
          <Element name="testimonials" id="testimonials" className="scroll-element-head">
            <FBTestimonial testimonials={profileDetails?.testimonials} />
          </Element>
          : <></>}
        {(profileDetails?.bankAccountStatus === true) || (profileDetails?.bankAccountDetails?.length > 0) || (profileDetails?.ePaymentStatus === true) || (profileDetails?.paymentDetails?.length > 0) ?
          <Element name="payments" id="payments" className="scroll-element-head">
            <FBPayment bankAccountDetails={profileDetails?.bankAccountDetails} paymentDetails={profileDetails?.paymentDetails} />
          </Element> : <></>}
        <Element className="scroll-element-head pb-5">
          <div></div>
        </Element>
        <FBFooter profileUserId={profileUserId} visitorInfo={visitorInfo} name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
          {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
        />
      </>
        :
        <NoAccessibleProfile />
      }

      {/* <FBAccessibility/> */}
    </>
  );
};

export default FBIndex;
