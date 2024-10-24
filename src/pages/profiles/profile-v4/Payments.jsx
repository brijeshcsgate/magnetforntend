import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import styles from "./styles/profileV4.module.css"
import { resizeImage } from '@/pages/ProfilePages/resizeImage'
import { Button } from '@mui/material'
const Payments = ({ bankAccountDetails, paymentDetails }) => {
  return (
    <Container>
      <div className={styles.payment}>
        <Col xs={6}>
          <div className={styles.titleUnderline}>
            <span></span>
            <h5>Payments</h5>
          </div>
          <p>{`Bank Name: `} <span className='text-secondary'>{bankAccountDetails?.accountName}</span></p>
          <p>{`Account Name: `} <span className='text-secondary'>{bankAccountDetails?.accountName}</span></p>
          <p>{`IFSC Code: `} <span className='text-secondary'>{bankAccountDetails?.ifsc}</span></p>
          <p>{`PAN Card No: `} <span className='text-secondary'>{bankAccountDetails?.pan}</span></p>
          {/* <p>{`Account Type:  `} <span className='text-secondary'>{`Savings Account`}</span></p> */}
          <p>{`Account No:  `} <span className='text-secondary'>{bankAccountDetails?.accountNumber}</span></p>
          <p>{`GST No.:  `} <span className='text-secondary'>{bankAccountDetails?.gst}</span></p>
          <p>{`Remark: `} <span className='text-secondary'>{bankAccountDetails?.remark}</span></p>
        </Col>
        <Col xs={6} className={styles.UPIImg}>
          <div className={styles.titleUnderline}>
            <span></span>
            <h5>UPI Image</h5>
          </div>
          <br />
          <Image src={paymentDetails?.image} fluid style={resizeImage(100, 100)} />
          <p>{`Payment Gateway Link: `} <span className='text-secondary'><Button variant="contained" size='small' color="success" onClick={(e) => { window.open(paymentDetails?.paymentGatewayLink, '_blank') }}>
            Click Here
          </Button></span></p>

        </Col>
      </div>
    </Container>
  )
}

export default Payments
