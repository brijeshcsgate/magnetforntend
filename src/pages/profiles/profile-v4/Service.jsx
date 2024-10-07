import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import styles from "./styles/profileV4.module.css"
import { ContextAPI } from '@/contextAPI/ContextProfileV2';
// import { ContextAPI } from '../../../contextAPI/ContextProfileV2';

const Service = () => {
const {serviceInfo,setServiceInfo}=useContext(ContextAPI)

  const serviceModalInfo=()=>{
    setServiceInfo({data:"This is by context API"})
  }
  return (
    <>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Service</h5>
      </div>
      <Row xs={1} md={2} lg={2} xl={3} className="g-3" >
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ margin: "10px" }}>
              <Card.Img variant="top" src={"/imgV4/1.png"} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text style={{ fontSize: "13px", color: "gray" }}>
                  We are a team of professional Insurance and
                  Financial Advisors who are here to cater......
                </Card.Text>
                <Button data-bs-toggle="modal" data-bs-target="#serviceModal" style={{ backgroundColor: "#425cbb", borderRadius: "1rem", border: "none", fontSize: "14px", fontWeight: "bold", marginLeft: "5px" }}>View Details</Button>
                <Button onClick={serviceModalInfo} data-bs-toggle="modal" data-bs-target="#formModal" style={{ backgroundColor: "#425cbb", borderRadius: "1rem", border: "none", fontSize: "14px", fontWeight: "bold", marginLeft: "5px" }}>Enquiry</Button>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Service
