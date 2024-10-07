import React from 'react'
import styles from "./styles/profileV2.module.css"
import NavbarV2 from './NavbarV2'

const Header = () => {

  return (
    <>


      <div className={styles.headerContainer} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}` + "/img/img_bg_header.jpg)" }}>

        <div className={styles.headerOverlay}>

          <div className={`${styles.details}`}>
            <div className={`${styles.profileImg}`}><img width={`100%`} height={`100%`} src={`${process.env.PUBLIC_URL + "/img/profile.jpg"}`} alt="" /></div>
            <div className={`${styles.profileDetails}`}>
              <div style={{ fontFamily: "Roboto Mono,monospace", fontStyle: "italic" }}>{`
                 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`}</div>
              <div>
                <h2 style={{ fontFamily: "Roboto Mono,monospace" }}>{`Shahista Naaz`}</h2>
                <p style={{ fontFamily: "Roboto Mono,monospace" }}>{`(Front-End Developer)`}</p>
              </div>
              <div style={{ fontFamily: "Roboto Mono,monospace" }}>{`Life Insurance Corporation of India`}</div>
              <div>
                <img height={"50px"} src={`${process.env.PUBLIC_URL + "/img/liclogo.png"}`} alt="" />
                <img data-bs-toggle="modal" data-bs-target="#qrModal" className='m-3' height={"50px"} src={`${process.env.PUBLIC_URL + "/img/qr.png"}`} alt="" />
              </div>
              <div className={`${styles.contactButton}`}>
                <button>Refer Business</button>
                <button>Enquiry</button>
                <button>Save My Contact</button>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
