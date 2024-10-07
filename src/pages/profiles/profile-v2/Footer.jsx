import React, { useContext } from 'react'
import styles from "./styles/profileV2.module.css"
import { Link } from 'react-router-dom'
import { FaSquareFacebook } from "react-icons/fa6"
import { AiFillInstagram } from "react-icons/ai"
import { FaYoutube, FaPinterestSquare } from "react-icons/fa"
import { IoLogoTwitter } from "react-icons/io"
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'

const Footer = () => {

    const { isScrolled, choosenColor } = useContext(ContextAPI)

    return (
        <div className={`${styles.footerContainer}`} style={{ backgroundColor: `${choosenColor?choosenColor:"#6d56c1"}` }}>
            <div className={`${styles.footersButton}`}>
                <button>Refer Business</button>
                <button>Enquiry</button>
                <button>Save my Contact</button>
            </div>
            <div className={`${styles.socialIcon}`}>
                <Link to={`#`}><FaSquareFacebook color='lightgray' fontSize={`30px`} /></Link>
                <Link to={`#`}><AiFillInstagram color='lightgray' fontSize={`30px`} /></Link>
                <Link to={`#`}><IoLogoTwitter color='lightgray' fontSize={`30px`} /></Link>
                <Link to={`#`}><FaYoutube color='lightgray' fontSize={`30px`} /></Link>
                <Link to={`#`}><FaPinterestSquare color='lightgray' fontSize={`30px`} /></Link>
            </div>
        </div>
    )
}

export default Footer
