import React, { useContext } from 'react'
import styles from "./styles/profileV2.module.css"
import { Link } from 'react-router-dom'
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'
import { resizeImage } from '@/pages/ProfilePages/resizeImage'
import { Button } from "@mui/material";
const Payments = ({ bankAccountDetails, paymentDetails }) => {

    const { isScrolled, choosenColor, setIsScrolled } = useContext(ContextAPI)
    return (
        <div className={styles.paymentContainer}>
            <h2 className='text-secondary'>Payments</h2>
            <div className={styles.paymentBoxs}>
                <div>
                    {bankAccountDetails?.bankName ?
                        <div>
                            <div className='text-secondary'>Bank Name</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.bankName}</p>
                        </div> : <></>}
                    {bankAccountDetails?.accountName ?
                        <div>
                            <div className='text-secondary'>Acount Name</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.accountName}</p>
                        </div> : <></>}
                    {bankAccountDetails?.ifsc ?
                        <div>
                            <div className='text-secondary'>IFSC Code</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.ifsc}</p>
                        </div> : <></>}
                </div>
                <div>
                    {bankAccountDetails?.pan ?
                        <div>
                            <div className='text-secondary'>{`PAN Card Number`}</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.pan}</p>
                        </div> : <></>}
                    {/* <div>
                        <div className='text-secondary'>{`Account Type:`}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{`Savings account`}</p>
                    </div> */}
                    {bankAccountDetails?.accountNumber ?
                        <div>
                            <div className='text-secondary'>{`Account Number:`}</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.accountNumber}</p>
                        </div> : <></>}
                    {bankAccountDetails?.remark ?
                        <div>
                            <div className='text-secondary'>{`Remark:`}</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.remark}</p>
                        </div> : <></>}
                </div>
                <div>
                    {bankAccountDetails?.gst ?
                        <div>
                            <div className='text-secondary'>{`GST No.:`}</div>
                            <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{bankAccountDetails?.gst}</p>
                        </div> : <></>}
                    {paymentDetails?.upiId ? <>
                        <div className='text-secondary'>{`Upi ID: `}</div>
                        <p style={{ color: `${isScrolled && choosenColor ? choosenColor : isScrolled ? choosenColor : ""}` }}>{paymentDetails?.upiId}</p>
                    </> : <></>}
                </div>
                <div>
                    <div>
                        {paymentDetails?.paymentGatewayLink ?
                            <div className='text-secondary'>{`Payment Gateway Link: `} <Button variant="contained" size='small' color="success" onClick={(e) => { window.open(paymentDetails?.paymentGatewayLink, '_blank') }}>
                                Click Here
                            </Button></div>
                            : <></>}


                    </div>
                    {paymentDetails?.image ? <>
                        <div className='text-secondary'>{`UPI Image`}</div>
                        <div>
                            <img src={paymentDetails?.image} alt="" style={resizeImage(100, 100)} />
                        </div>
                    </> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Payments
