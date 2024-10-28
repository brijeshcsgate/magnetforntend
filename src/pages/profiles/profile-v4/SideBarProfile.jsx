import React, { useState } from 'react'
import style from "./styles/profileV4.module.css"
import { FiExternalLink } from 'react-icons/fi';
import { BiSearchAlt2, BiDownload, BiLogoTwitter } from 'react-icons/bi';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPinterestP } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
import P4ReferrelForm from './P4ReferrelForm';
import P4EnquiryForm from './P4EnquiryForm';
import { resizeImage } from '@/pages/ProfilePages/resizeImage';
const SideBarProfile = ({ profileImage, name, message, jobRoleName,
  industryName, orgLogo, facebookLink, coverImage,
  instaLink, twitterLink, linkedInLink,
  youtubeLink, Qr, profileUserId, visitorInfo, whatsappNumber, email, companyName, designation, mobile }) => {

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
  const [IsReferalForm, setIsReferalForm] = useState(false)
  const [IsEnquiryFormData, setIsEnquiryFormData] = useState(false)

  return (
    <div className={`${style.containerFluid}`}>
      <div className='mb-4'>
        <div>
          <span className="card-title text-uppercase fw-bold fs-17">{name}</span>
          <p className={`${style.introName}`}>{jobRoleName}</p>
        </div>
        <div >
          <img src={profileImage} alt="Shahista-profile" />
        </div>
        <div>
          <p className={`${style.intro}`}>{message}</p>
        </div>
      </div>
      <div>
        <div>
          <h6 className={`${style.h6}`}>{industryName}</h6>
          <img src={Qr} alt={Qr} className={`${style.licImg}`} style={resizeImage(80, 40)} />
          <div>

            <P4ReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
            <P4EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
            <button className={`${style.button}`} onClick={generateVCard}><span className={`${style.buttonText}`}>Save My Contact </span> <span className={`${style.iconsSpan}`}><BiDownload className={`${style.icons}`} /></span></button>
          </div>
          <div className="w-100">
            <span className={`${style.socialIconsSpan}`}>
              {facebookLink ?

                <a href={facebookLink}> <FaFacebookF className={`${style.socialIconsFb}`} /> </a>
                : <></>}
              {youtubeLink ?
                <a href={youtubeLink}><BiLogoTwitter className={`${style.socialIconsTi}`} /></a>
                : <></>}
              {instaLink ?
                <a href={instaLink}> <FaInstagram className={`${style.socialIconsInsta}`} /></a>
                : <></>}
              {linkedInLink ?
                <a href={linkedInLink}><FaLinkedin className={`${style.socialIconsPi}`} /></a>
                : <></>}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBarProfile
