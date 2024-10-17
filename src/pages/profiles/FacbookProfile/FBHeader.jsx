import React, { useState } from 'react'
import './fbstyle.css'

import { Link } from 'react-router-dom'
import { FaLinkedin, FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoTwitter } from 'react-icons/io'
import FBReferrelForm from './FBReferrelForm'
import FBEnquiryForm from './FBEnquiryForm'
import { SaveIcon } from 'lucide-react'
const FBHeader = ({ profileImage, name, message, jobRoleName,
    industryName, orgLogo, facebookLink, coverImage,
    instaLink, twitterLink, linkedInLink,
    youtubeLink, Qr, profileUserId, visitorInfo, whatsappNumber, email, companyName, designation, mobile }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [IsReferalForm, setIsReferalForm] = useState(false)
    const [IsEnquiryFormData, setIsEnquiryFormData] = useState(false)


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
        <div className="header ">
            <div className="container mx-auto bg-head">
                <div className="relative">
                    <div className="heroback">
                        <img src={profileImage} className="w-full h-10" />
                    </div>
                    <div className="flex justify-between items-start  profilecont">
                        <div className="profileimg">
                            <img src={profileImage} alt=""
                                className="w-[180px] h-[180px] rounded-full object-cover" />
                        </div>
                        <div className="aboutprofile text-left">
                            <h2 className="text-2xl font-bold">
                                Brijesh Yadav
                                <span className="block text-gray-500 sm:inline">(Web Developer)</span>
                            </h2>
                            <span className="italic text-gray-600">
                                It is a long established fact that a reader will be distracted by the readable content of a
                                page when looking at its layout.
                            </span>
                            <div className="  flex mt-4 space-x-2 linkbar w-full justify-center">
                             
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
                        <div className="socillink flex flex-col items-end " >
                            <div className="herologo flex items-center space-x-2 js-cent">
                                <img src={profileImage} alt="" className="w-15 h-10 " />
                                <img data-bs-toggle="modal" href="#exampleModalToggle" role="button" src={profileImage}
                                    alt="" className="w-10 h-10 cursor-pointer" />
                            </div>
                            <div className="herologo ">
                                <h6 className="text-lg font-semibold">Life Insurance Corporation of India</h6>
                            </div>
                            <div className="flex-db space-x-2  linkbutton">
                                <FBReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
                                <FBEnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
                                <button onClick={generateVCard} className='ref-button flex-db'><SaveIcon /><span> Save My Contact</span></button>


                            </div>
                        </div>
                    </div>
                    <div className="topend"></div>

                    <div className="navigation pos-fix" id="navbar">
                        <nav className="navbar navbar-expand-lg navbar-light p-0 ">
                            <button style={{ boxShadow: 'none' }} className="block md:hidden" type="button" data-bs-toggle="collapse" onClick={handleToggle}
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <button style={{ border: 'none' }} className="block md:hidden p-0" data-bs-toggle="collapse" onClick={handleToggle}
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <div className="d-flex align-items-center">
                                    <p className="m-0 me-2"> Brijesh Yadav</p>
                                    <img style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                        src={profileImage} alt="" />
                                </div>
                            </button>
                            <div className={` ${isMenuOpen ? '' : 'hidden'} md:flex md:items-center`} id="">

                                {/* <div className="" id="navbarSupportedContent"> */}
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 space-x-4">
                                    <li className="nav-item">
                                        <a className="nav-link active text-blue-600" href="#prolink">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#servlink">Services</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#prodlink">Products</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#offer">Offers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#imglink">Gallery</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#testilink">Testimonial</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-blue-600" href="#paylink">Payment</a>
                                    </li>
                                    <li className="topUserImg">
                                        <p className="text-gray-600">Brijesh Yadav</p>
                                        <img className="w-10 h-10 rounded-full object-cover" src="assets/img/new.jpeg" alt="" />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FBHeader
