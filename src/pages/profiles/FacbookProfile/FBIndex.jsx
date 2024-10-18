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
//     <div className="header">
//     <div className="container mx-auto">
//         <div className="relative">
//             <div className="heroback">
//                 <img src={profileDetails?.profileImage} className="w-full h-10"/>
//             </div>
//             <div className="flex justify-between items-start  profilecont">
//                 <div className="profileimg">
//                     <img src={profileDetails?.profileImage} alt=""
//                         className="w-[180px] h-[180px] rounded-full object-cover"/>
//                 </div>
//                 <div className="aboutprofile text-left">
//                     <h2 className="text-2xl font-bold">Brijesh Yadav <span className="text-gray-500">(Web Developer)</span></h2>
//                     <span className="italic text-gray-600">
//                         It is a long established fact that a reader will be distracted by the readable content of a
//                         page when looking at its layout.
//                     </span>
//                     <div className="flex mt-4 space-x-2 linkbar">
//                         <a href="" className="text-blue-600"><i className="fa-brands fa-facebook-square"></i></a>
//                         <a href="" className="text-pink-600"><i className="fa-brands fa-instagram-square"></i></a>
//                         <a href="" className="text-blue-500"><i className="fa-brands fa-twitter-square"></i></a>
//                         <a href="" className="text-red-600"><i className="fa-brands fa-youtube-square"></i></a>
//                         <a href="" className="text-blue-700"><i className="fa-brands fa-linkedin-in"></i></a>
//                     </div>
//                 </div>
//                 <div className="socillink flex flex-col items-end " >
//                     <div className="herologo flex items-center space-x-2 ">
//                         <img src={profileDetails?.profileImage} alt="" className="w-15 h-10 "/>
//                         <img data-bs-toggle="modal" href="#exampleModalToggle" role="button" src={profileDetails?.profileImage}
//                             alt="" className="w-10 h-10 cursor-pointer"/>
//                     </div>
//                     <div className="herologo ">
//                         <h6 className="text-lg font-semibold">Life Insurance Corporation of India</h6>
//                     </div>
//                     <div className="flex space-x-2  linkbutton">
//                         <a data-bs-toggle="modal" data-bs-target="#refer-business" name="" id=""
//                             className=" First-act bg-blue-500 text-white px-4 py-2 rounded" href="#" role="button"><i
//                                 className="fa-solid fa-briefcase"></i> Refer Business</a>
//                         <a name="" id="" className="btn bg-gray-200 text-black px-4 py-2 rounded" href="#" role="button"><i
//                                 className="fa-solid fa-circle-question"></i> Enquiry</a>
//                         <a name="" id="" className="btn bg-gray-200 text-black px-4 py-2 rounded" href="#" role="button"><i
//                                 className="fa-solid fa-floppy-disk"></i> Save My Contact</a>
//                     </div>
//                 </div>
//             </div>
//             <div className="topend"></div>

//             <div className="navigation " id="navbar">
//                 <nav className="navbar navbar-expand-lg navbar-light p-0">
//                     <button style={{boxShadow:'none'}} className="block md:hidden" type="button" data-bs-toggle="collapse" onClick={handleToggle}
//                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <button style={{border:'none'}} className="block md:hidden p-0" data-bs-toggle="collapse"  onClick={handleToggle}
//                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                         <div className="d-flex align-items-center">
//                             <p className="m-0 me-2"> Brijesh Yadav</p>
//                             <img style={{width: '40px',height:'40px',borderRadius: '50%', objectFit: 'cover'}}
//                                 src={profileDetails?.profileImage} alt=""/>
//                         </div>
//                     </button>
//                     <div className={` ${isMenuOpen ? '' : 'hidden'} md:flex md:items-center`} id="">
                  
//                     {/* <div className="" id="navbarSupportedContent"> */}
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0 space-x-4">
//                             <li className="nav-item">
//                                 <a className="nav-link active text-blue-600" href="#prolink">Profile</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#servlink">Services</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#prodlink">Products</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#offer">Offers</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#imglink">Gallery</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#testilink">Testimonial</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-blue-600" href="#paylink">Payment</a>
//                             </li>
//                             <li className="topUserImg">
//                                 <p className="text-gray-600">Brijesh Yadav</p>
//                                 <img className="w-10 h-10 rounded-full object-cover" src="assets/img/new.jpeg" alt=""/>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     </div>
// </div>
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
<FBAbout/>
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
