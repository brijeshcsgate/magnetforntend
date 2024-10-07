import React, { useContext } from 'react'
import styles from "./styles/profileV2.module.css"
import { Link } from 'react-router-dom'
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'
const Payments = () => {

    const { isScrolled, choosenColor, setIsScrolled } = useContext(ContextAPI)
    return (
        <div className={styles.paymentContainer}>
            <h2 className='text-secondary'>Payments</h2>
            <div className={styles.paymentBoxs}>
                <div>
                    <div>
                        <div className='text-secondary'>Bank Name</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>Bank of Maharashtra</p>
                    </div>
                    <div>
                        <div className='text-secondary'>Acount Name</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>Ashish Chaudhary</p>
                    </div>
                    <div>
                        <div className='text-secondary'>IFSC Code</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>PUNB0733600</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='text-secondary'>{`PAN Card Number`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`AAAAA7777A`}</p>
                    </div>
                    <div>
                        <div className='text-secondary'>{`Account Type:`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`Savings account`}</p>
                    </div>
                    <div>
                        <div className='text-secondary'>{`Account Number:`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`XXXXXXXXXX`}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='text-secondary'>{`GST No.:`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`07AAACP0165G2ZQ`}</p>
                    </div>
                    <div>
                        <div className='text-secondary'>{`Remark:`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`Is it possible to reverse funds transferred to the wrong account..`}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='text-secondary'>{`UPI Image`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>Bank of Maharashtra</p>
                    </div>
                    <div>
                        <img  src={`${"/img/qr.png"}`} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payments
