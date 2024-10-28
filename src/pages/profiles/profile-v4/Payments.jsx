import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import styles from "./styles/profileV4.module.css"
import { resizeImage } from '@/pages/ProfilePages/resizeImage'
import { Button } from '@mui/material'
const Payments = ({ bankAccountDetails, paymentDetails }) => {
  return (
    <div className={styles.pmtnContainer}>
      <div className={styles.payment}>
        <Col xs={6}>
          <div className={styles.m4linespacing}>
            <span></span>
            <h5 className={styles.fnSiz700}>Payments</h5>
          </div>
          <ul>
            <li className={styles.m4linespacing}>{`Bank Name: `} <span className='text-secondary'>{bankAccountDetails?.bankName}</span></li>
            <li className={styles.m4linespacing}>{`Account Name: `} <span className='text-secondary'>{bankAccountDetails?.accountName}</span></li>
            <li className={styles.m4linespacing}>{`IFSC Code: `} <span className='text-secondary'>{bankAccountDetails?.ifsc}</span></li>
            <li className={styles.m4linespacing}>{`PAN Card No: `} <span className='text-secondary'>{bankAccountDetails?.pan}</span></li>
            <li className={styles.m4linespacing}>{`Account No:  `} <span className='text-secondary'>{bankAccountDetails?.accountNumber}</span></li>
            <li className={styles.m4linespacing}>{`GST No.:  `} <span className='text-secondary'>{bankAccountDetails?.gst}</span></li>
            <li className={styles.m4linespacing}>{`Remark: `} <span className='text-secondary'>{bankAccountDetails?.remark}</span></li>
          </ul>

          {/* <p>{`Bank Name: `} <span className='text-secondary'>{bankAccountDetails?.accountName}</span></p>
          <p>{`Account Name: `} <span className='text-secondary'>{bankAccountDetails?.accountName}</span></p>
          <p>{`IFSC Code: `} <span className='text-secondary'>{bankAccountDetails?.ifsc}</span></p>
          <p>{`PAN Card No: `} <span className='text-secondary'>{bankAccountDetails?.pan}</span></p>
          <p>{`Account No:  `} <span className='text-secondary'>{bankAccountDetails?.accountNumber}</span></p>
          <p>{`GST No.:  `} <span className='text-secondary'>{bankAccountDetails?.gst}</span></p>
          <p>{`Remark: `} <span className='text-secondary'>{bankAccountDetails?.remark}</span></p> */}
        </Col>
        <Col xs={6} className={styles.UPIImg}>
          <div>
            <span></span>
            <h5 className={styles.fnSiz700}>UPI Image</h5>
          </div>
          <br />
          <Image src={paymentDetails?.image} fluid style={resizeImage(100, 100)} />
          <p>{`Payment Gateway Link: `} <span className='text-secondary'><Button variant="contained" size='small' color="success" onClick={(e) => { window.open(paymentDetails?.paymentGatewayLink, '_blank') }}>
            Click Here
          </Button></span></p>

        </Col>
      </div>
    </div>
  )
}

export default Payments
