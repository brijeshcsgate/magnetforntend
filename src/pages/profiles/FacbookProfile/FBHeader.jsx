import React, { useEffect, useState } from 'react'
import './fbstyle.css'

import { Link } from 'react-router-dom'
import { FaLinkedin, FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoTwitter } from 'react-icons/io'
import FBReferrelForm from './FBReferrelForm'
import FBEnquiryForm from './FBEnquiryForm'
import { SaveIcon } from 'lucide-react'
const BASE_URL_WAPI = `${import.meta.env.VITE_APP_BASE_URL_2}`;

import { APIS } from "@/constants/api.constant";
const FBHeader = ({ profileImage, name, message, jobRoleName,
    industryName, orgLogo, facebookLink, coverImage,
    instaLink, twitterLink, linkedInLink,
    youtubeLink, Qr, profileUserId, visitorInfo, whatsappNumber, email, companyName, designation, mobile }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [IsReferalForm, setIsReferalForm] = useState(false)
    const [IsEnquiryFormData, setIsEnquiryFormData] = useState(false)
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);


    const [isSticky, setIsSticky] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const url = BASE_URL_WAPI;
    console.log('url', url)
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

    useEffect(() => {
        const handleScroll = () => {
            //   const topOffset = document.getElementById("profileName").offsetTop;
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
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024); // Considers devices under 1024px as mobile or tablet
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const generateVCard = () => {
        const vCardData = `
    
    BEGIN:VCARD
    VERSION:3.0
    FN:${name}
    ORG:${companyName}
    TITLE:${designation}
    TEL;TYPE=WORK,VOICE:${mobile}
    TEL;TYPE=CELL,VOICE:${whatsappNumber}
    EMAIL:${email}
    END:VCARD
    `;

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        link.click();

        window.URL.revokeObjectURL(url);
    };


    return (
        <div className="fbheader ">
            <div className="fbcontainer mx-auto fbbg-head mn-pad">
                <div className="relative">
                    <div className="fbheroback " >
                        <img src={coverImage} className="w-full h-10" />
                    </div>
                    <div className="flex justify-between items-start  fbprofilecont">
                        <div className="flex   mart" >
                        <div className="fbprofileimg fbprofileimgposcent">
                            <img src={profileImage} alt=""
                                className="w-[180px] h-[180px] rounded-full object-cover" />
                        </div>
                        <div className=" lg:text-left md:text-center pt-5">
                            <h2 className="text-2xl font-bold">
                                {name}
                                <span className="block text-gray-500 sm:inline"> &nbsp;&nbsp;({jobRoleName})</span>
                            </h2>
                            <span className="italic text-gray-600">
                                {message}
                            </span>
                            <div className="  flex mt-4 space-x-2 fblinkbar w-full justify-center">

                                {facebookLink ?
                                    <Link to={facebookLink}><FaSquareFacebook color='lightgray' fontSize={`21px`} /></Link>
                                    : <></>}
                                {instaLink ? <Link to={instaLink}><AiFillInstagram color='lightgray' fontSize={`21px`} /></Link>
                                    : <></>}
                                {twitterLink ? <Link to={twitterLink}><IoLogoTwitter color='lightgray' fontSize={`21px`} /></Link>
                                    : <></>}
                                {youtubeLink ? <Link to={youtubeLink}><FaYoutube color='lightgray' fontSize={`21px`} /></Link>
                                    : <></>}
                                {linkedInLink ? <Link to={linkedInLink}><FaLinkedin color='lightgray' fontSize={`21px`} /></Link>
                                    : <></>}
                            </div>
                        </div>
                        </div>
                        <div className="socillink flex flex-col lg:items-end md:items-center" >
                            <div className="fbherologo flex items-center space-x-2 fbjs-cent">
                                <img src={orgLogo} alt="" className="w-15 h-10 " />
                                {Qr ? <img data-bs-toggle="modal" href="#exampleModalToggle" role="button" src={Qr}
                                    alt="" className="w-10 h-10 cursor-pointer" /> : <></>}
                            </div>
                            <div className="fbherologo ">
                                <h6 className="text-lg font-semibold">{industryName}</h6>
                            </div>
                            {/* <div className="fbflex-db space-x-2  fblinkbutton flex">
                                <FBReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
                                <FBEnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
                                <button onClick={generateVCard} className='fbref-button fbflex-db fl-g10-r'><SaveIcon /><span> Save My Contact</span></button>


                            </div> */}
                        </div>
                    </div>
                    <div className="fbtopend"></div>

                    <div className="navigation pos-fix " id="navbar">
                        <nav className={`navbar navbar-expand-lg fbnavbar-light p-0  ${isSticky ? "pl-3 pr-3 sticky-hed2 fbgradient-box-header" : ""}`}>
                            {isMobileOrTablet && (
                                <>
                                    <button style={{ boxShadow: 'none' }} className="block lg:hidden" type="button" data-bs-toggle="collapse" onClick={handleToggle}
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <button style={{ border: 'none' }} className="block lg:hidden p-0" data-bs-toggle="collapse" onClick={handleToggle}
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <div className="d-flex align-items-center">
                                            <p className="m-0 me-2"> {name}</p>
                                            <img style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                                src={profileImage} alt="" />
                                        </div>
                                    </button>
                                </>)}
                            <div className={`${isMobileOrTablet ? (isMenuOpen ? '' : 'hidden') : 'block'} lg:flex lg:items-center`}
                                // className={` ${isMenuOpen ? '' : 'hidden'} md:flex md:items-center`}
                                id="">
                                <div>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 space-x-4">
                                        <li className="nav-item">
                                            <a className={`nav-link active  ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#profile">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#services">Services</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#products">Products</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#offers">Offers</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#imageGallery">Gallery</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#testimonials">Testimonial</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`nav-link ${isSticky ? "text-white-600 txt-color" : "text-blue-600"}`} href="#payments">Payment</a>
                                        </li>




                                    </ul>

                                </div>
                                {isSticky ?
                                    <div className="flex fbposright">
                                        <p className="text-white-600 mt-2">{name}</p>
                                        <img className="w-10 h-10 rounded-full object-cover" src={profileImage} alt="" />
                                    </div> : <></>}
                                {/* </div> */}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FBHeader
