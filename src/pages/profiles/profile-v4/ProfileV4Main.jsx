import React, { useEffect, useState } from 'react'
// import Main from "./Main";
import NavbarV4 from "./NavbarV4";
import SideBarProfile from "./SideBarProfile";
import QrModal from "../../../components/profile-v4/QrModal";
import ServiceModal from "../../../components/profile-v4/ServiceModal";
import styles from "./styles/profileV4.module.css";
import ProfileModal from "../../../components/profile-v4/ProfileModal";
import Main from "./Main";
import { APIS } from '@/constants/api.constant'
import apiService from '@/lib/apiService'
import NoAccessibleProfile from '@/pages/NoAccessibleProfile/NoAccessibleProfile';
import VistiorInfoForm from '@/pages/ProfilePages/VistiorInfoForm';
import { useParams } from 'react-router-dom';
import OfferModal from '@/components/profile-v4/OfferModal';

const ProfileV4Main = () => {





  const [profiles, setProfiles] = useState([]);

  const [profileDetails, setProfileDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitorInfoType, setVisitorInfoType] = useState('')

  const [visitorInfo, setVisitorInfo] = useState('')
  const [profileUserId, setProfileUserId] = useState('')
  const [profileStatus, setProfileStatus] = useState(true)
  const { id } = useParams(); // Access the id from URL
  let profileId = id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.get(`${APIS.PROFILE_IDENT}/${id}`);
        setProfileStatus(response?.data?.profileStatus)
        setProfileUserId(response.data._id)
        setProfileDetails(response.data);
        setProfiles(response.data.testimonials);
        setVisitorInfoType(response.data.vistor_info_type)
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  return (
    <>
      {profileStatus === true ? <>
        <VistiorInfoForm openP={visitorInfoType != 'Not Required' ? true : false} visitorInfoType={visitorInfoType} profileUserId={profileUserId} setVisitorInfo={setVisitorInfo} />

        <QrModal />
        <ProfileModal />
        <ServiceModal />
        <OfferModal />
        <div
          className={`${styles.sidebarOnResponsive} container-fluid row p-5 bg-light`}
        >
          <div className={`${styles.sidebar} col-md-3  bg-white p-3`}>
            <SideBarProfile profileImage={profileDetails?.profileImage} name={profileDetails?.name} message={profileDetails?.message} jobRoleName={profileDetails?.jobRoleName}
              industryName={profileDetails?.industryName} orgLogo={profileDetails?.orgLogo} facebookLink={profileDetails?.facebookLink}
              instaLink={profileDetails?.instaLink} twitterLink={profileDetails?.twitterLink} linkedInLink={profileDetails?.linkedInLink}
              youtubeLink={profileDetails?.youtubeLink}
              Qr={profileDetails?.paymentDetails?.image}
              coverImage={profileDetails?.coverImage}
              profileUserId={profileUserId} visitorInfo={visitorInfo} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
              {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}
            />
          </div>
          <div className={`${styles.navAndMain} col-md-9 pl-3 `}>
            <div className={`${styles.toStickyNav}`}>
              <NavbarV4 name={profileDetails?.name} profileImage={profileDetails?.profileImage} />
            </div>
            <div className="bg-white mt-4 p-2">
              <Main profileDetails={profileDetails} profileUserId={profileUserId} visitorInfo={visitorInfo} name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
                {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile} />
            </div>
          </div>
        </div>
      </>
        :
        <NoAccessibleProfile />
      }
    </>
  );
};

export default ProfileV4Main;
