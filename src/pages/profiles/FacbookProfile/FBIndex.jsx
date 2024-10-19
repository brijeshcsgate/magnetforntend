import React, { useEffect, useRef, useState } from "react";
// import "../../ProfilePageCss/basic.css";
// import "../../ProfilePageCss/layout.css";
// import "../../ProfilePageCss/ionicons.css";
// import "../../ProfilePageCss/owl-carousel.css";
// import "../../ProfilePageCss/magnific-popup.css";
// import "../../ProfilePageCss/custom.css";
import './fbstyle.css'
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
// import img3 from "./Images/product.jpg";

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
const FBIndex = () => {


    // const items = [
    //     { name: 'Home', link: '#Home', icon: <HomeIcon /> },
    //     { name: 'Profile', link: '#Profile', icon: <UserIcon /> },
    //     { name: 'Services', link: '#Services', icon: <HandHelpingIcon /> },
    //     { name: 'Products', link: '#Products', icon: <ShoppingBasketIcon /> },
    //     { name: 'Offers', link: '#Offers', icon: <HandCoins /> },
    //     { name: 'Gallery', link: '#Gallery', icon: <ImagesIcon /> },
    //     { name: 'Testimonials', link: '#Testimonials', icon: <Pyramid /> },
    
    //     { name: 'Payments', link: '#Testimonials', icon: <BanknoteIcon /> },
    //   ];
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
<FBHeader profileImage={profileDetails?.profileImage} name={profileDetails?.name} message={profileDetails?.message} jobRoleName={profileDetails?.jobRoleName} 
            industryName={profileDetails?.industryName} orgLogo={profileDetails?.orgLogo} facebookLink={profileDetails?.facebookLink}
            instaLink={profileDetails?.instaLink} twitterLink={profileDetails?.twitterLink} linkedInLink={profileDetails?.linkedInLink}
            youtubeLink={profileDetails?.youtubeLink}
            Qr={profileDetails?.paymentDetails?.image}
            coverImage={profileDetails?.coverImage}
            profileUserId={profileUserId} visitorInfo={visitorInfo} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
                {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
              />
<FBAbout aboutUs={profileDetails?.aboutUs} countryCode={profileDetails?.countryCode} mobile={profileDetails?.mobile} whatsappNumberCountryCode={profileDetails?.whatsappNumberCountryCode} whatsappNumber={profileDetails?.whatsappNumber} 
            email={profileDetails?.email} address={profileDetails?.address}/>
<FBService profileImage={profileDetails?.profileImage}/>
<FBProduct profileImage={profileDetails?.profileImage}/>
<FBImage profileImage={profileDetails?.profileImage}/>
<FBVideo/>
<FBLinks/>
<FBTestimonial/>
<FBPayment profileImage={profileDetails?.profileImage}/>
<FBFooter profileUserId={profileUserId} visitorInfo={visitorInfo} name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
          {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
/>
{/* <FBAccessibility/> */}

</>
  );
};

export default FBIndex;
