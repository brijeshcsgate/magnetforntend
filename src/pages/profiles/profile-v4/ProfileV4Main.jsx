import React from "react";
// import Main from "./Main";
import NavbarV4 from "./NavbarV4";
import SideBarProfile from "./SideBarProfile";
import QrModal from "../../../components/profile-v4/QrModal";
import ServiceModal from "../../../components/profile-v4/ServiceModal";
import styles from "./styles/profileV4.module.css";
import ProfileModal from "../../../components/profile-v4/ProfileModal";
import Main from "./Main";
const ProfileV4Main = () => {
  return (
    <>
      <QrModal />
      <ProfileModal />
      <ServiceModal />
      <div
        className={`${styles.sidebarOnResponsive} container-fluid row p-5 bg-light`}
      >
        <div className={`${styles.sidebar} col-md-3  bg-white p-3`}>
          <SideBarProfile />
        </div>
        <div className={`${styles.navAndMain} col-md-9 pl-3 `}>
          <div className={`${styles.toStickyNav}`}>
            <NavbarV4 />
          </div>
          <div className="bg-white mt-4 p-2">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileV4Main;
