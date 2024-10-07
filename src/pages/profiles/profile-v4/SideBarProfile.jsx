import React from 'react'
import style from "./styles/profileV4.module.css"
import { FiExternalLink } from 'react-icons/fi';
import { BiSearchAlt2, BiDownload, BiLogoTwitter } from 'react-icons/bi';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
const SideBarProfile = () => {
  return (
    <div className={`${style.containerFluid}`}>
        <div>
          <div>
            <span className="card-title text-uppercase fw-bold fs-17">SHAHISTA NAAZ</span>
            <p className="fs-13">Front-end-Developer</p>
          </div>
          <div>
            <img src={'/imgV4/profile-img.jpg'} alt="Shahista-profile" width={"100%"} />
          </div>
          <div>
            <p className={`${style.intro}`}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          </div>
        </div>
        <div>
          <div>
            <h6 className={`${style.h6}`}>Life Insurance Corporation of India</h6>
            <img src={'/imgV4/liclogo.png'} alt="Shahista-profile" className={`${style.licImg}`} />
            <div>
              <button className={`${style.button}`} data-bs-toggle="modal" data-bs-target="#formModal"><span className={`${style.buttonText}`}>Refer Business </span> <span className={`${style.iconsSpan}`}><FiExternalLink className={`${style.icons}`} /></span></button>
              <button className={`${style.button}`}><span className={`${style.buttonText}`}>Enquiry </span> <span className={`${style.iconsSpan}`}><BiSearchAlt2 className={`${style.icons}`} /></span></button>
              <button className={`${style.button}`}><span className={`${style.buttonText}`}>Save My Contact </span> <span className={`${style.iconsSpan}`}><BiDownload className={`${style.icons}`} /></span></button>
            </div>
            <div className="w-100">
              <span className={`${style.socialIconsSpan}`}>
                <a href='avascript:void(0)'> <FaFacebookF className={`${style.socialIconsFb}`} /> </a>
                <a href='avascript:void(0)'><BiLogoTwitter className={`${style.socialIconsTi}`} /></a>
                <a href='avascript:void(0)'> <FaInstagram className={`${style.socialIconsInsta}`} /></a>
                <a href='avascript:void(0)'><FaPinterestP className={`${style.socialIconsPi}`} /></a>
                <a href='avascript:void(0)'><AiOutlineYoutube className={`${style.socialIconsYo}`} /></a>
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SideBarProfile
