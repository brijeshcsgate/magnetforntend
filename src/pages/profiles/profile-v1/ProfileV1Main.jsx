import React, { useContext } from "react";
import Main from "./Main";
import EnquiryModal from "../../../components/profile-v1/EnquiryModal";
import styles from "./styles/profileV1.module.css";
import ProfileModal from "../../../components/profile-v1/ProfileModal";
import ServiceModal from "../../../components/profile-v1/ServiceModal";
import QrModal from "../../../components/profile-v2/QrModal"
import GalleryModal from "../../../components/profile-v1/GalleryModal";
const ProfileV1Main = () => {

  return (
    <div >
      <EnquiryModal />
      <GalleryModal />
      <QrModal/>
      <ProfileModal/>
      <ServiceModal/>
      <div className={styles.profileV1Cont} id={styles.MainBgColor} >
          <Main />
      </div>
    </div>
  );
};

export default ProfileV1Main;
