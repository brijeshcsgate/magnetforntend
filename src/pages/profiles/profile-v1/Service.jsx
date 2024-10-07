import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import styles from "./styles/profileV1.module.css";
import { TfiGallery } from "react-icons/tfi";
import axios from "axios";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
const Service = () => {
  const { choosenColor } = useContext(ContextAPI);
  const [serviceData, setServiceDate] = useState([]);
  const { setViewDetailsModalV1 } = useContext(ContextAPI);

  const handleSetViewDetialsModal = (ele) => {
    setViewDetailsModalV1(ele);
  };
  const getShortText = (text, limit) => {
    if (text && limit) {
      let str = text?.split("");
      let shortText = str?.slice(0, limit);
      return `${shortText.join("")}....`;
    }
  };
  const getServiceDate = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY0ZDFlOGY0ZjNhNzUzMjFlMGE4YzQ5OSIsImlhdCI6MTY5MTQ3ODI2MH0.TSIxHVxpi6DQk15tscKJq03cTwdK33NeEz1rij9ualo";
    axios
      .get(`http://localhost:8080/getservice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setServiceDate(res.data.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getServiceDate();
  }, []);
  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className={styles.serviceContainer}
    >
      <div className={styles.contentTitles}>
        <span className={styles.firstWord}>
          <span
            className="first-word"
            style={{ color: `${choosenColor ? choosenColor : "#a9dfa2"}` }}
          >
            Service
          </span>
        </span>{" "}
        Details
      </div>
      <Row xs={1} md={2} lg={2} className={`${styles.cardContainer} g-3`}>
        {serviceData.length > 0 &&
          serviceData?.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <span className={styles.parentOverLayIcon}>
                  <Card.Img
                    variant="top"
                    height={`170px`}
                    src={process.env.PUBLIC_URL + "/img/cover.jpg"}
                  />
                  <span className={styles.showOverLayIcon}>
                    <TfiGallery
                      fontSize={`4rem`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                  </span>
                </span>
                <Card.Body>
                  <Card.Title>{getShortText(item.title, 2)}</Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "13px",
                      color: "gray",
                      minHeight: "4rem",
                    }}
                  >
                    {getShortText(item.description, 150)}
                  </Card.Text>
                  <Button
                    data-bs-toggle="modal"
                    data-bs-target="#serviceModal"
                    style={{
                      backgroundColor: "#eeeeee",
                      borderRadius: "0.3rem",
                      fontSize: "11px",
                      border: "none",
                      fontWeight: "bold",
                      marginLeft: "5px",
                      color: "gray",
                    }}
                    onClick={() => handleSetViewDetialsModal(item)}
                  >
                    View Details
                  </Button>
                  <Button
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                    style={{
                      backgroundColor: "#eeeeee",
                      borderRadius: "0.3rem",
                      border: "none",
                      fontSize: "11px",
                      fontWeight: "bold",
                      marginLeft: "5px",
                      color: "gray",
                    }}
                  >
                    Enquiry
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Service;
