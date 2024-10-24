import React, { useContext, useState } from 'react'
import styles from "./styles/profileV2.module.css"
import { Link } from 'react-router-dom'
import { FaLinkedin, FaLinkedinIn, FaSquareFacebook } from "react-icons/fa6"
import { AiFillInstagram } from "react-icons/ai"
import { FaYoutube, FaPinterestSquare } from "react-icons/fa"
import { IoLogoTwitter } from "react-icons/io"
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'
import ReferrelForm from '@/components/RefferalForm/ReferrelForm'
import EnquiryForm from '@/components/EnquiryForm/EnquiryForm'

const Footer = ({ profileUserId, visitorInfo, name, whatsappNumber, email, companyName, designation, mobile, facebookLink,
  instaLink, twitterLink, linkedInLink,
  youtubeLink }) => {

  const { isScrolled, choosenColor } = useContext(ContextAPI)
  const [IsReferalForm, setIsReferalForm] = useState(false)
  const [IsEnquiryFormData, setIsEnquiryFormData] = useState(false)



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
    <div className={`${styles.footerContainer}`} style={{ backgroundColor: `${choosenColor ? choosenColor : "#6d56c1"}` }}>
      <div className={`${styles.footersButton}`}>
        <ReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
        <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
        <button onClick={generateVCard}>Save my Contact</button>
      </div>

      <div className={`${styles.socialIcon}`}>

        {facebookLink ?
          <Link to={facebookLink}><FaSquareFacebook color='lightgray' fontSize={`30px`} /></Link>
          : <></>}
        {instaLink ? <Link to={instaLink}><AiFillInstagram color='lightgray' fontSize={`30px`} /></Link>
          : <></>}
        {twitterLink ? <Link to={twitterLink}><IoLogoTwitter color='lightgray' fontSize={`30px`} /></Link>
          : <></>}
        {youtubeLink ? <Link to={youtubeLink}><FaYoutube color='lightgray' fontSize={`30px`} /></Link>
          : <></>}
        {linkedInLink ? <Link to={linkedInLink}><FaLinkedin color='lightgray' fontSize={`30px`} /></Link>
          : <></>} </div>
    </div>
  )
}

export default Footer
