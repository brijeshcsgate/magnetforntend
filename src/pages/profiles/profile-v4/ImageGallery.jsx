import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const ImageGallery = ({images}) => {
    return (
        <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {images?.map((item, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={item?.image} className='fbobjectFitcover'/>
              <Card.Body>
                <Card.Title>{item?.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
}

export default ImageGallery
