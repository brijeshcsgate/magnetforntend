import React, { useState } from 'react'
import styles from "./styles/profileV2.module.css"
import NavbarV2 from './NavbarV2'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaSquareFacebook, FaYoutube } from 'react-icons/fa6'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoTwitter } from 'react-icons/io'
import { FaPinterestSquare } from 'react-icons/fa'
import { resizeImage } from '@/pages/ProfilePages/resizeImage'
import ReferrelForm from '@/components/RefferalForm/ReferrelForm'
import EnquiryForm from '@/components/EnquiryForm/EnquiryForm'

const Header = ({ profileImage, name, message, jobRoleName,
  industryName, orgLogo, facebookLink,coverImage,
  instaLink, twitterLink, linkedInLink,
  youtubeLink, Qr ,profileUserId ,visitorInfo,  whatsappNumber, email, companyName, designation, mobile}) => {
  // console.log('url',profileImage)
  
  
  const [IsReferalForm,setIsReferalForm]=useState(false)
const [IsEnquiryFormData,setIsEnquiryFormData]=useState(false)
   


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
    <>


      <div className={styles.headerContainer} style={{ backgroundImage: `url(${coverImage})` }}>

        <div className={styles.headerOverlay}>

          <div className={`${styles.details}`}>
            <div className={`${styles.profileImg}`}><img width={`100%`} height={`100%`} src={profileImage} alt="" /></div>
            <div className={`${styles.profileDetails}`}>
              <div style={{ fontFamily: "Roboto Mono,monospace", fontStyle: "italic" }}>{message}</div>
              <div>
                <h2 style={{ fontFamily: "Roboto Mono,monospace" }}>{name}</h2>
                <p style={{ fontFamily: "Roboto Mono,monospace" }}>{jobRoleName}</p>
              </div>
              <div style={{ fontFamily: "Roboto Mono,monospace" }}>{industryName}</div>
              <div style={{ display: 'flex', height: '50px', gap: '10px' }} className='mt-3 mb-3'>
              {orgLogo?  <img src={orgLogo} alt="" className="w-full h-full object-cover"
                  style={resizeImage(100, 50)}
                />:<></>}

                {Qr?
                <img data-bs-toggle="modal" data-bs-target="#qrModal" className="w-full h-full object-cover"
                  style={resizeImage(50, 50)} src={Qr} alt="" />:<></>}
              </div>
              <div className={`${styles.contactButton}`}>
                {/* <button>Refer Business</button> */}
                <ReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm}/>
                {/* <button>Enquiry</button> */}
                <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo}IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData}/>
               <button onClick={generateVCard}>Save My Contact</button>
              </div>
              <div className={`mt-3 ${styles.socialIcon}`} >

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
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
