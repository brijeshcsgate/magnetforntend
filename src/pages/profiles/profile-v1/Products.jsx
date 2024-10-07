import React from "react";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "./styles/profileV1.module.css";
const Products = () => {
  return (
    <div
      style={{ backgroundColor: "white" }}
      className={styles.productContainer}
    >
      <div className={styles.contentTitles}>
        <span className={styles.firstWord}>
          <span className="first-word">Products</span>
        </span>{" "}
        Details
      </div>
      <Row xs={1} md={2} lg={2} className="g-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <span className={styles.parentOverLayIcon}>
                <Card.Img
                  variant="top"
                  height={`165px`}
                  src={"/img/cover.jpg"}
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
                <Card.Title>Nike</Card.Title>
                <Card.Text style={{ fontSize: "13px", color: "gray" }}>
                  &#8377;{`2000`}
                  <p
                    style={{
                      display: "flex",
                      gap: "3px",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <AiOutlineGlobal />
                    </span>
                    {`https://www.troology.com/`}
                  </p>
                </Card.Text>
                <Button
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal"
                  style={{
                    backgroundColor: "#eeeeee",
                    borderRadius: "0.3rem",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                    color:"gray"

                  }}
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
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                    color:"gray"

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

export default Products;
