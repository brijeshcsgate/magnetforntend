import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import styles from "./styles/profileV4.module.css"
import { ContextAPI } from '@/contextAPI/ContextProfileV2';
import TextToggler from '@/pages/ProfilePages/TextToggler';
import { resizeImage } from '@/pages/ProfilePages/resizeImage';
import EnquiryInfoFormOnClick from '@/pages/ProfilePages/EnquiryInfoFormOnClick';
// import { ContextAPI } from '../../../contextAPI/ContextProfileV2';

const Service = ({ services, profileUserId, visitorInfo }) => {
  const { serviceInfo, setServiceInfo } = useContext(ContextAPI)

  const [openEf, setOpenEf] = React.useState(false);
  const handleSendServiceV1ModalData = (ele) => {
    setServiceInfo(ele);
  };
  const btnStyle = { backgroundColor: "#425cbb", borderRadius: "1rem", border: "none", fontSize: "14px", fontWeight: "bold", marginLeft: "5px", padding: '6px 12px', height: '36px' }
  const serviceModalInfo = () => {
    setServiceInfo({ data: "This is by context API" })
  }
  return (
    <>
      <div >
        <span></span>
        <h5 className={styles.fnSiz700}>Service</h5>
      </div>
      <Row xs={1} md={2} lg={2} xl={3} className="g-3" >
        {services?.length > 0 &&
          services?.map((item) => (
            <Col key={item.id}>
              <Card style={{ margin: "10px" }}>
                <Card.Img variant="top" src={item.image} className={styles.objectFitcover} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text style={{ fontSize: "13px", color: "gray" }}>
                    <TextToggler text={item.description} charLimit={20} isShowBtn={false} />

                  </Card.Text>
                  {/* prof4-btn */}
                  <Button data-bs-toggle="modal" data-bs-target="#serviceModal" style={btnStyle} onClick={() => handleSendServiceV1ModalData(item)}>View Details</Button>
                  <Button
                    onClick={() => setOpenEf(true)}
                    style={btnStyle}>Enquiry</Button>
                </Card.Body>
              </Card>
              <EnquiryInfoFormOnClick openEf={openEf} setOpenEf={setOpenEf} profileUserId={profileUserId} visitorInfo={visitorInfo} />

            </Col>
          ))}
      </Row>
    </>
  )
}

export default Service
