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
const About = () => {
    const [showMore, setShowMore] = useState(false)
    const { choosenColor } = useContext(ContextAPI)
    const handleClick = () => {
        setShowMore(!showMore)
    }
    return (
        <>
        {/* About Section  */}
            <div className={styles.titleUnderline}>
                <span></span>
                <h5>About</h5>
            </div>
            <p style={{ padding: "0px 10px" }} className='text-secondary'>This section shall help you to have detailed information about yourself. Create it quickly with Magnets set
                of pre-defined ready to use templates across industries of your ch<span id="dots" style={{ display: `${showMore ? "none" : "inline"}` }}>...</span><span id="more" style={{ display: `${showMore ? "inline" : "none"}` }}>oice enim ligula venenatis dolor.
                    Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
                    Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
                    ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum.
                    Sed dapibus pulvinar nibh tempor porta.</span>
                <span onClick={handleClick} style={{ color: "#6a5fb0" }}>{showMore ? "see less" : "see more"}</span>
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
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`(+91) 8126 139 074`}</p>
                    </div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><BsGlobe /></span>Website:</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`www.magnet.cards`}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}> <span><ImWhatsapp /></span>{`WhatsApp Number:`}</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`(+91) 8126 139 074`}</p>
                    </div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><BsTelegram /></span>{`Telegram:`}</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`@gyangps`}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><MdMailOutline /></span>Email address:
                            :</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`ashish.kumar@troology.com`}</p>
                    </div>
                    <div>
                        <div className={`${style.contactmeIcon} text-secondary`}><span><FaLocationPin /></span>Address:</div>
                        <p style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}>{`Hazratganj, Lucknow, Uttar Pradesh 226001`}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default About
