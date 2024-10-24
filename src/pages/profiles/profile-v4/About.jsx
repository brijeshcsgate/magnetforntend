import React, { useContext } from 'react'
import styles from "./styles/profileV4.module.css"
import { useState } from 'react'
import ContectMe from '../profile-v2/ContectMe'
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'
import { BsTelephoneFill, BsGlobe, BsTelegram } from "react-icons/bs"
import { FaLocationPin } from "react-icons/fa6"
import { MdMailOutline } from "react-icons/md"
import { ImWhatsapp } from "react-icons/im"
import style from "./styles/profileV4.module.css"
const About = ({ aboutUs, countryCode, mobile, whatsappNumberCountryCode, whatsappNumber,
    email, address }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { choosenColor } = useContext(ContextAPI)
    // Toggle the text view
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={styles.h80vh}>
            {/* About Section  */}
            <div className={styles.titleUnderline}>
                <span></span>
                <h5>About</h5>
            </div>
            <p style={{ padding: "0px 10px" }} className='text-secondary'> {isExpanded ? aboutUs : aboutUs?.slice(0, 200)}
                {aboutUs?.length >= 200 ?
                    <span onClick={toggleText} id="dots" style={{ color: 'blue' }}>
                        {isExpanded ? "show less" : "... see more"}
                    </span> : <></>
                }
            </p>
            <br />


            {/* Contact Me section */}

            <div className={styles.titleUnderline}>
                <span></span>
                <h5>Contact Me</h5>
            </div>

            <div className={style.contactBoxs} style={{ padding: "0px 10px" }} >
                <div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><BsTelephoneFill /></span><span>Phone Number</span></div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}><a href={`tel:+${countryCode}) ${mobile}`} className="hover-text "target="_blank">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} > <span>
                                (+{countryCode}) {mobile}</span>
                              </span></a></p>
                    </div>
                    {/* <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><BsGlobe /></span>Website:</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`www.magnet.cards`}</p>
                    </div> */}
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><FaLocationPin /></span>Address:</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{address}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}> <span><ImWhatsapp /></span>{`WhatsApp Number:`}</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{<a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="hover-text ">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <span>

                                (+{whatsappNumberCountryCode}) {whatsappNumber}</span>
                              </span></a>}</p>
                    </div>
                    {/* <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><BsTelegram /></span>{`Telegram:`}</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`@gyangps`}</p>
                    </div> */}
                </div>
                <div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><MdMailOutline /></span>Email address:
                            :</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>
                        <a href={`mailto:${email}`} target="_blank" className="hover-text ">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} > <span>

                                {email}</span>
                              </span></a>
                        </p>
                    </div>
                    {/* <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><FaLocationPin /></span>Address:</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{address}</p>
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default About
