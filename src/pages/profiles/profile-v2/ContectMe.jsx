import React, { useContext } from 'react'
import styles from "./styles/profileV2.module.css"
import { BsTelephoneFill, BsGlobe, BsTelegram } from "react-icons/bs"
import { FaLocationPin } from "react-icons/fa6"
import { MdMailOutline } from "react-icons/md"
import { ImWhatsapp } from "react-icons/im"
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'
import { Mail, MessageCircleIcon, PhoneIcon } from 'lucide-react'
const ContectMe = ({countryCode, mobile, whatsappNumberCountryCode, whatsappNumber, 
    email, address}) => {
    const { isScrolled, choosenColor, setIsScrolled } = useContext(ContextAPI)

    return (
        <div className={styles.contactmeContainer}>
            <h2 className='text-secondary'>Contacts</h2>
            <div className={styles.contactBoxs}>
                <div>
                    <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}><span><BsTelephoneFill /></span><span>Phone Number</span></div>
                        <p  style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}><a href={`tel:+${countryCode}) ${mobile}`} className="hover-text "target="_blank">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} > <span>
                                (+{countryCode}) {mobile}</span>
                                {/* <PhoneIcon size={20} /> */}
                              </span></a></p>
                    </div>
                    <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}><span><FaLocationPin /></span>Address:</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}>{address}</p>
                    </div>
                    {/* <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}><span><BsGlobe /></span>Website:</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}>{`www.magnet.cards`}</p>
                    </div> */}
                </div>
                <div>
                    <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}> <span><ImWhatsapp /></span>{`WhatsApp Number:`}</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}>{<a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="hover-text ">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <span>

                                (+{whatsappNumberCountryCode}) {whatsappNumber}</span>
                                {/* <MessageCircleIcon size={20} /> */}
                              </span></a>}</p>
                    </div>
                    {/* <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}><span><BsTelegram /></span>{`Telegram:`}</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}>{`@gyangps`}</p>
                    </div> */}
                </div>
                <div>
                    <div>
                        <div className={`${styles.contactmeIcon} text-secondary`}><span><MdMailOutline /></span>Email address:
                            :</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}> <a href={`mailto:${email}`} target="_blank" className="hover-text ">
                              <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} > <span>

                                {email}</span>
                                {/* <Mail size={20} /> */}
                              </span></a></p>
                    </div>
                    <div>
                        {/* <div className={`${styles.contactmeIcon} text-secondary`}><span><FaLocationPin /></span>Address:</div>
                        <p style={{ color: `${choosenColor}`,paddingLeft:"1.5rem" }}>{address}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContectMe
