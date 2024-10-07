import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import styles from "./styles/profileV4.module.css"
const Payments = () => {
  return (
    <Container>
      <div className={styles.payment}>
        <Col xs={6}>
          <div className={styles.titleUnderline}>
            <span></span>
            <h5>Payments</h5>
          </div>
          <p>{`Bank Name: `} <span className='text-secondary'>{`Bank of Maharashtra`}</span></p>
          <p>{`Account Name: `} <span className='text-secondary'>{`Shahista Naaz`}</span></p>
          <p>{`IFSC Code: `} <span className='text-secondary'>{`PUNB0733600`}</span></p>
          <p>{`PAN Card No: `} <span className='text-secondary'>{`AAAAA7777A`}</span></p>
          <p>{`Account Type:  `} <span className='text-secondary'>{`Savings Account`}</span></p>
          <p>{`Account No:  `} <span className='text-secondary'>{`XXXXXXXXXX`}</span></p>
          <p>{`GST No.:  `} <span className='text-secondary'>{` 07AAACP0165G2ZQ`}</span></p>
          <p>{`Remark: `} <span className='text-secondary'>{`Is it possible to reverse funds transferred to the wrong account.`}</span></p>
        </Col>
        <Col xs={6} className={styles.UPIImg}>
          <div className={styles.titleUnderline}>
            <span></span>
            <h5>UPI Image</h5>
          </div>
          <br />
          <Image src={process.env.PUBLIC_URL + "/imgV4/qr.png"} fluid />
        </Col>
      </div>
    </Container>
  )
}

export default Payments
