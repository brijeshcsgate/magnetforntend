import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import styles from "./styles/profileV4.module.css"
import Carousel from 'react-bootstrap/Carousel';
import TextToggler from '@/pages/ProfilePages/TextToggler';
import EnquiryInfoFormOnClick from '@/pages/ProfilePages/EnquiryInfoFormOnClick';
import { ContextAPI } from '@/contextAPI/ContextProfileV2';

const Offers = ({item,profileUserId, visitorInfo}) => {
  const btnStyle={ backgroundColor: "#425cbb", borderRadius: "1rem", border: "none", fontSize: "14px", fontWeight: "bold", marginLeft: "5px",padding:'6px 12px' , height:'36px'}
  
  
const {setOfferInfo}=useContext(ContextAPI)

const [openEf, setOpenEf] = React.useState(false);
  const handleSendServiceV1ModalData = (ele) => {
    setOfferInfo(ele);
  };
  return (
    <>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Offers</h5>
      </div>
      <Row xs={1} md={2} lg={2} xl={3} className="g-4">

      {item?.length > 0 &&
        item.map((ele) => (
          <Col key={ele.id}>
            <Card>
              <Carousel indicatorLabels={null} indicators={null} draggable={1} nextIcon={null} nextLabel={null} prevIcon={null} prevLabel={null}>
              {/* {ele?.image?.map((image, index) => (
        <Carousel.Item key={index}> */}
          <Card.Img variant="top" src={ele?.image} className={styles.objectFitcover}/>
        {/* </Carousel.Item>
      ))} */}
              </Carousel>
              <Card.Body>
                <Card.Title>{ele?.name}</Card.Title>
                <Card.Text style={{ fontSize: "13px", color: "gray" }} >
                <TextToggler text={ele.description} charLimit={20} isShowBtn={false} />
           
                </Card.Text>
                <div>
                  <div style={{ color: `#656dc6` }}>Start Date: <span style={{ fontSize: "17px" }}>{ele.startDate}, {ele.startTime}</span>
                  {/* <span className='text-decoration-line-through' style={{ fontSize: "12px" }}>{` 1300`}</span> */}
                  </div>
                  <div style={{ color: `#656dc6` }}>End Date: <span style={{ fontSize: "17px" }}>{ele.endDate}, {ele.endTime}    </span>
                 
                </div>
                </div>
                {/* <div>
                  <p style={{ color: `#656dc6` }}>{`https://troology.com`}</p>
                </div> */}
                <div style={{ display: "flex" }}>

                  <Button data-bs-toggle="modal" data-bs-target="#offerModal" style={btnStyle} onClick={() => handleSendServiceV1ModalData(ele)}>View Details</Button>
                  <Button data-bs-toggle="modal" data-bs-target="#formModal" style={btnStyle}
                  
                onClick={() => setOpenEf(true)}
                  >Enquiry</Button>
                </div>
              </Card.Body>
            </Card>
            <EnquiryInfoFormOnClick openEf={openEf} setOpenEf={setOpenEf} profileUserId={profileUserId} visitorInfo={visitorInfo} />

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Offers
