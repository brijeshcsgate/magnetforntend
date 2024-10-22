import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import styles from "./styles/profileV4.module.css"
import Carousel from 'react-bootstrap/Carousel';

const Products = () => {
  const btnStyle={ backgroundColor: "#425cbb", borderRadius: "1rem", border: "none", fontSize: "14px", fontWeight: "bold", marginLeft: "5px",padding:'6px 12px' , height:'36px'}

  return (
    <>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Product</h5>
      </div>
      <Row xs={1} md={2} lg={2} xl={3} className="g-4">

        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Carousel indicatorLabels={null} indicators={null} draggable={1} nextIcon={null} nextLabel={null} prevIcon={null} prevLabel={null}>
                <Carousel.Item>
                  <Card.Img variant="top" src={"/imgV4/2.jpg"} />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img variant="top" src={"/imgV4/1.png"} />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img variant="top" src={"/imgV4/2.jpg"} />
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text style={{ fontSize: "13px", color: "gray" }} >
                  We are a team of professional Insurance and
                  Financial Advisors who are here to cater......
                </Card.Text>
                <div>
                  <div style={{ color: `#656dc6` }}>MRP: <span style={{ fontSize: "17px" }}>{`1000`}</span><span className='text-decoration-line-through' style={{ fontSize: "12px" }}>{` 1300`}</span></div>
                </div>
                <div>
                  <p style={{ color: `#656dc6` }}>{`https://troology.com`}</p>
                </div>
                <div style={{ display: "flex" }}>

                  <Button data-bs-toggle="modal" data-bs-target="#serviceModal" style={btnStyle}>View Details</Button>
                  <Button data-bs-toggle="modal" data-bs-target="#formModal" style={btnStyle}>Enquiry</Button>
                </div>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Products
