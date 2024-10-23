import VideoCard from '@/pages/ProfilePages/VideoCard';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const VideoGallery = ({videos}) => {
    return (
        <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {videos?.map((video, idx) => (
          <Col key={idx}>
            <Card>
            <VideoCard
                  key={idx}
                  popupHref={video?.link}
                  videoSrc={video?.link}
                  title={video?.name}
                  dataSrId={video?.dataSrId}
                /> 
              {/* <Card.Img variant="top" src={"/imgV4/product.jpg"} />
              <Card.Body>
                <Card.Title>Video {idx+1}</Card.Title>
              </Card.Body> */}
            </Card>
          </Col>
        ))}
      </Row>
    )
}

export default VideoGallery
