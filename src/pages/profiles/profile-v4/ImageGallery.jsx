import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const ImageGallery = () => {
    return (
        <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={"/imgV4/product.jpg"} />
              <Card.Body>
                <Card.Title>Image {idx+1}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
}

export default ImageGallery
