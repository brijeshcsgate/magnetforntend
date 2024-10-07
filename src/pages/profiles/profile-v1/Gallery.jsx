import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./styles/profileV1.module.css";
import { TfiGallery } from "react-icons/tfi";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import { FaLink,FaGoogleDrive } from "react-icons/fa";
import {AiFillFilePdf,AiFillFileExcel} from "react-icons/ai"
const Gallery = () => {
  const { choosenColor,setGalleryModalData,setGalleryModalShow } = useContext(ContextAPI);

  const handleGalleryModalData=(ele)=>{
    setGalleryModalData(ele)
    setGalleryModalShow(true)
  }
  return (
    <div
      style={{ backgroundColor: "white" }}
      className={styles.galleryContainer}
    >
      <div className={styles.imageGallerySection}>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">Image</span>
          </span>{" "}
          Gallery
        </div>
        <Row xs={1} md={2} lg={2} xl={2} className="g-4">
          {Array.from({ length: 4 }).map((ele, idx) => (
            <Col key={idx}>
              <Card onClick={()=>handleGalleryModalData({str:"this is data will come from Gallery component",idx})}>
                <span className={styles.parentOverLayIcon}>
                  <Card.Img
                    variant="top"
                    src={"/imgV4/product.jpg"}
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
                  <Card.Title>Image {idx + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles.videoGallerySection}>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">Video</span>
          </span>{" "}
          Gallery
        </div>
        <Row xs={1} md={2} lg={2} xl={2} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <span className={styles.parentOverLayIcon}>
                  <Card.Img
                    variant="top"
                    src={"/imgV4/product.jpg"}
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
                  <Card.Title>Video {idx + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.ImportantSection}>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">Important</span>
          </span>{" "}
          Link
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.singleLink}>
            <span
              style={{
                width:"40px",
                height:"40px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                padding: "10px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                
              }}
            >
              <FaLink />
            </span>
            <div
              style={{
                color: `${choosenColor ? choosenColor : "gray"}`,
              }}
            >
              Link Name 1
            </div>
          </div>
          <div className={styles.singleLink}>
            <span
              style={{
                padding: "10px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                width:"40px",
                height:"40px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <AiFillFilePdf />
            </span>
            <div
              style={{
                color: `${choosenColor ? choosenColor : "gray"}`,
              }}
            >
              Link Name 2
            </div>
          </div>
          <div className={styles.singleLink}>
            <span
              style={{
                padding: "10px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                width:"40px",
                height:"40px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <FaGoogleDrive />
            </span>
            <div
              style={{
                color: `${choosenColor ? choosenColor : "gray"}`,
              }}
            >
              Link Name 3
            </div>
          </div>
          <div className={styles.singleLink}>
            <span
              style={{
                padding: "10px",
                borderRadius: "50%",
                backgroundColor: "lightgray",
                width:"40px",
                height:"40px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <AiFillFileExcel />
            </span>
            <div
              style={{
                color: `${choosenColor ? choosenColor : "gray"}`,
              }}
            >
              Link Name 4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
