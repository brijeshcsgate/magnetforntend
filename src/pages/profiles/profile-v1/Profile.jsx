import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./styles/profileV1.module.css";
import { FaUserFriends, FaFacebookSquare, FaDownload } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsYoutube, BsLinkedin, BsPinterest } from "react-icons/bs";

const Profile = () => {
  return (
    <div className={styles.profileParent} style={{ width: "100%" }}>
      <div
        className={styles.profile}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}` + "/img/cover.jpg)",
        }}
      >
        <div
          className={styles.profileQr}
          data-bs-toggle="modal"
          data-bs-target="#qrModal"
        >
          <img src={`${process.env.PUBLIC_URL + "/img/qr.png"}`} alt="" />
        </div>
        <div className={styles.downloadBtn}>
          <button>
            Download VCF <FaDownload />
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.profileImgDiv}>
          <img
            width={`100%`}
            height={`100%`}
            src={`${process.env.PUBLIC_URL + "/img/ashish.jpeg"}`}
            alt=""
          />
        </div>
      </div>
      <div className={styles.profileText}>
        <div className={styles.profileTextDetails}>
          <div className={styles.profileDes}>
            <span style={{fontSize:"12px",fontWeight:"500"}}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </span>
          </div>
          <div className={styles.profileName}>Ashish Chaudhary</div>
          <div style={{ color: "burlywood" }}>Full Stack Developer</div>
          <div className={styles.profileCompany}>
            Life Insurance Corporation of India
          </div>
          <div className={styles.profileLogo}>
            <img
              src={`${process.env.PUBLIC_URL + "/img/liclogo.png"}`}
              alt=""
            />
          </div>
        </div>
        <div className={styles.profileReferAndEnquiry}>
          <div data-bs-toggle="modal" data-bs-target="#formModal">
            REFER BUSINESS{" "}
            <span>
              <FaUserFriends fontSize={`20px`} />
            </span>
          </div>
          <div data-bs-toggle="modal" data-bs-target="#formModal">
            ENQUIRY{" "}
            <span>
              <BiSolidNavigation fontSize={`20px`} />
            </span>
          </div>
        </div>
        <Container>
          <Row style={{ textAlign: "center" }}>
            <Col
              style={{
                backgroundColor: "#0a4492",
                color: "white",
                padding: "10px",
              }}
            >
              <FaFacebookSquare />
            </Col>
            <Col
              style={{
                backgroundColor: "#cf0013",
                color: "white",
                padding: "10px",
              }}
            >
              <AiOutlineInstagram />
            </Col>
            <Col
              style={{
                backgroundColor: "#1b8bce",
                color: "white",
                padding: "10px",
              }}
            >
              <AiOutlineTwitter />
            </Col>
            <Col
              style={{
                backgroundColor: "#dc061b",
                color: "white",
                padding: "10px",
              }}
            >
              <BsYoutube />
            </Col>
            <Col
              style={{
                backgroundColor: "#0067ab",
                color: "white",
                padding: "10px",
              }}
            >
              <BsLinkedin />
            </Col>
            <Col
              style={{
                backgroundColor: "#dc061b",
                color: "white",
                padding: "10px",
              }}
            >
              <BsPinterest />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
